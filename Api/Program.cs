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
        return Results.NoContent();
    return Results.Ok(rating);
}).Produces<PlaylistRatingDto>(StatusCodes.Status200OK).Produces(StatusCodes.Status204NoContent);

app.MapPost("/ratings/{spotifyId}", async (string spotifyId, [FromBody] int rating, IPlaylistRepo repo) =>
{
    var newRating = await repo.AddRating(spotifyId, rating);
    return Results.Created($"/ratings/{newRating.Id}", newRating);
}).Produces<PlaylistRatingDto>(StatusCodes.Status201Created);

app.MapPut("/ratings/{spotifyId}", async (string spotifyId, [FromBody] int rating, IPlaylistRepo repo) =>
{
    var existingRating = await repo.GetRating(spotifyId);
    if (existingRating == null)
        return Results.NoContent();
    var updatedRating = await repo.UpdateRating(spotifyId, rating);
    return Results.Ok(updatedRating);
}).Produces<PlaylistRatingDto>(StatusCodes.Status200OK)
    .Produces(StatusCodes.Status204NoContent);

app.MapDelete("/ratings/{id}", async (string id, IPlaylistRepo repo) =>
{
    await repo.DeleteRating(id);
    return Results.Ok();
}).Produces(StatusCodes.Status200OK);


//TODO remove
app.UseCors(p => p.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod());
app.UseRouting();
app.UseEndpoints(e => e.MapDefaultControllerRoute());
app.MapFallbackToFile("index.html");


app.Run();
