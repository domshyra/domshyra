using Interfaces;
using Providers;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllersWithViews();
//TODO remove
builder.Services.AddCors();
builder.Services.AddDbContext<PlaylistDbContext>(options => 
    options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking));

builder.Services.AddScoped<ISpotifyProvider, SpotifyProvider>();
builder.Services.AddScoped<IPlaylistRepo, PlaylistRepo>();

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

app.MapGet("/ratings", (IPlaylistRepo repo) => repo.GetRatings()).Produces<PlaylistRatingDto[]>(StatusCodes.Status200OK);
app.MapGet("/ratings/{spotifyId}", async (string spotifyId, IPlaylistRepo repo) =>
{
    var rating = await repo.GetRating(spotifyId);
    if (rating == null)
        return Results.Problem($"Playlist rating with id {spotifyId} not found", statusCode: 404);
    return Results.Ok(rating);
}).ProducesProblem(404).Produces<PlaylistRatingDto>(StatusCodes.Status200OK);

app.MapPost("/ratings", async ([FromBody]PlaylistRatingDto rating, IPlaylistRepo repo) =>
{
    var newRating = await repo.AddRating(rating);
    return Results.Created($"/ratings/{newRating.Id}", newRating);
}).Produces<PlaylistRatingDto>(StatusCodes.Status201Created);


//TODO remove
app.UseCors(p => p.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod());
app.UseRouting();
app.UseEndpoints(e => e.MapDefaultControllerRoute());
app.MapFallbackToFile("index.html");


app.Run();
