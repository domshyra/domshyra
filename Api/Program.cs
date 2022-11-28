using Interfaces;
using Providers;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllersWithViews();
//TODO remove
builder.Services.AddCors();


builder.Services.AddScoped<ISpotifyProvider, SpotifyProvider>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseStaticFiles();
app.UseHttpsRedirection();

app.MapGet("/spotify", async (ISpotifyProvider _spotifyProvider) =>
{
    return await _spotifyProvider.GetPlaylists();
}).WithName("GetSpotifyPlaylists");

//TODO remove
app.UseCors(p => p.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod());
app.UseRouting();
app.UseEndpoints(e => e.MapDefaultControllerRoute());
app.MapFallbackToFile("index.html");


app.Run();
