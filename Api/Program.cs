using System.Reflection;
using Api.Data.Database;
using Api.Data.Entities;
using Azure.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

# region key vault 
if (builder.Environment.IsDevelopment())
{
  var keyVaultEndpoint = new Uri(Environment.GetEnvironmentVariable("VaultUri") ?? throw new ArgumentNullException("VaultUri"));
  DefaultAzureCredentialOptions options = new()
  {
    ManagedIdentityClientId = Environment.GetEnvironmentVariable("AzureKeyVaultClientId") ?? throw new ArgumentNullException("AzureKeyVaultClientId"),
  };
  builder.Configuration.AddAzureKeyVault(keyVaultEndpoint, new DefaultAzureCredential(options));
}
#endregion

#region authentication
builder.Services.AddAuthorization();
//This is an older way to do identity
// builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//     .AddMicrosoftIdentityWebApi(builder.Configuration.GetSection("AzureAd")); // would need a AD section in appsettings.json

#endregion

#region swagger
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(setUpActions =>
            {
              setUpActions.SwaggerDoc("v1", new OpenApiInfo { Title = "Api", Version = "v1" });
              setUpActions.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
              {
                Description = @"JWT Authorization header using the Bearer scheme. <br/> 
                      Enter 'Bearer' [space] and then your token in the text input below.
                      <br/>Example: 'Bearer 12345abcdef'",
                Name = "Authorization",
                In = ParameterLocation.Header,
                Type = SecuritySchemeType.ApiKey,
                Scheme = "Bearer"
              });

              setUpActions.AddSecurityRequirement(new OpenApiSecurityRequirement()
                {
                    {
                        new OpenApiSecurityScheme
                      {
                        Reference = new OpenApiReference
                          {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                          },
                          Scheme = "oauth2",
                          Name = "Bearer",
                          In = ParameterLocation.Header,

                        },
                        new List<string>()
                      }
                    });

              string xmlCommentsFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
              string xmlFullPath = Path.Combine(AppContext.BaseDirectory, xmlCommentsFile);

              setUpActions.IncludeXmlComments(xmlFullPath);
            });

#endregion

builder.Services.AddApplicationInsightsTelemetry();
builder.Services.AddCors();

#region database
builder.Services.AddDbContext<ExampleDbContext>(options =>
{
  if (builder.Environment.IsDevelopment())
  {
    var databaseName = Environment.GetEnvironmentVariable("RENAME-TO-APP-NAME-DB") ?? throw new ArgumentNullException("RENAME-TO-APP-NAME-DB");
    options.UseSqlServer($"Data Source=(LocalDB)\\MSSQLLocalDB;Database={databaseName};Integrated Security=True;Connect Timeout=30");
  }
  else if (builder.Environment.IsProduction())
  {
    options.UseSqlServer(builder.Configuration.GetConnectionString("DbConnectionString"), sqlServerOptionsAction: sqlOptions =>
        {
          sqlOptions.EnableRetryOnFailure(
            maxRetryCount: 10,
            maxRetryDelay: TimeSpan.FromSeconds(30),
            errorNumbersToAdd: null);
        });

  }
  else
  {
    throw new Exception("Env not specified");
  }
  options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
});
#endregion

#region identity

// add identity services
builder.Services
    .AddIdentityApiEndpoints<UserEntity>()
    .AddRoles<RoleEntity>()
    .AddEntityFrameworkStores<ExampleDbContext>();

#endregion

// json patch
//?https://learn.microsoft.com/en-us/aspnet/core/web-api/jsonpatch
builder.Services.AddControllers().AddNewtonsoftJson();

# region services
// register services
// builder.Services.AddScoped<IExampleService, ExampleService>();

#endregion

var app = builder.Build();
// app.MapGroup("/account").WithTags("Account").MapIdentityApi<UserEntity>(); //uncomment this to use ALL of the identity endpoints

var identityApis = app.MapIdentityApi<UserEntity>();
identityApis.AddEndpointFilter(async (efiContext, next) =>
{
  if (efiContext.HttpContext.Request.Path == "/login")
    return await next(efiContext);
  return Results.Forbid();
});

#region http
// Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment()) // add this back to disable swagger production build is used
// {
app.UseSwagger();
app.UseSwaggerUI();
// }

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

#endregion

#region cors
// CORS
if (app.Environment.IsDevelopment())
{
  app.UseDeveloperExceptionPage();
  app.UseCors(p => p.WithOrigins(app.Configuration["FrontEndUrl"] ?? throw new ArgumentNullException("FrontEndUrl")).AllowAnyHeader().AllowAnyMethod());
}
else
{
  app.UseCors(p => p.WithOrigins(
  [
    app.Configuration["FrontEndUrlAzureSites"] ?? throw new ArgumentNullException("FrontEndUrlAzureSites"),
    app.Configuration["FrontEndUrlWww"] ?? throw new ArgumentNullException("FrontEndUrlWww"),
    app.Configuration["FrontEndUrl"] ?? throw new ArgumentNullException("FrontEndUrl")
  ]).AllowAnyHeader().AllowAnyMethod());

}

#endregion

app.Run();
