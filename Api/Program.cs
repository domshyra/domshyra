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
// builder.Services.AddCors();
builder.Services.AddDbContext<PlaylistDbContext>(options =>
    options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking));

builder.Services.AddScoped<ISpotifyProvider, SpotifyProvider>();
builder.Services.AddScoped<IPlaylistRepo, PlaylistRepo>();

var app = builder.Build();

// Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
// {
    app.UseSwagger();
    app.UseSwaggerUI();
// }
app.UseStaticFiles();
app.UseHttpsRedirection();

//Routes
UseSpotifyPlaylistRoutes(app);
UseRatingsRoutes(app);


//TODO remove
// app.UseCors(p => p.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod());
app.UseRouting();
app.UseEndpoints(e => e.MapDefaultControllerRoute());
app.MapFallbackToFile("index.html");


app.Run();

static void UseSpotifyPlaylistRoutes(WebApplication app)
{
    app.MapGet("/spotify", async (ISpotifyProvider _spotifyProvider) =>
    {
        return await _spotifyProvider.GetPlaylists();
    }).WithName("GetSpotifyPlaylists");

    app.MapGet("/spotify/{playlistId}", async (string playlistId, ISpotifyProvider _spotifyProvider) =>
    {
        return await _spotifyProvider.GetPlaylist(playlistId);
    }).WithName("GetSpotifyPlaylist");
}

static void UseRatingsRoutes(WebApplication app)
{
    app.MapGet("/ratings", (IPlaylistRepo repo) => repo.GetRatings()).Produces<PlaylistRatingDto[]>(StatusCodes.Status200OK);
    app.MapGet("/ratings/{playlistId}", async (string playlistId, IPlaylistRepo repo) =>
    {
        var rating = await repo.GetRating(playlistId);
        if (rating == null)
            return Results.NoContent();
        return Results.Ok(rating);
    }).Produces<PlaylistRatingDto>(StatusCodes.Status200OK).Produces(StatusCodes.Status204NoContent);

    app.MapPost("/ratings/{playlistId}", async (string playlistId, [FromBody] int rating, IPlaylistRepo repo) =>
    {
        var newRating = await repo.AddRating(playlistId, rating);
        return Results.Created($"/ratings/{newRating.Id}", newRating);
    }).Produces<PlaylistRatingDto>(StatusCodes.Status201Created);

    app.MapPut("/ratings/{playlistId}", async (string playlistId, [FromBody] int rating, IPlaylistRepo repo) =>
    {
        var existingRating = await repo.GetRating(playlistId);
        if (existingRating == null)
            return Results.NoContent();
        var updatedRating = await repo.UpdateRating(playlistId, rating);
        return Results.Ok(updatedRating);
    }).Produces<PlaylistRatingDto>(StatusCodes.Status200OK)
        .Produces(StatusCodes.Status204NoContent);

    app.MapDelete("/ratings/{id}", async (string id, IPlaylistRepo repo) =>
    {
        await repo.DeleteRating(id);
        return Results.Ok();
    }).Produces(StatusCodes.Status200OK);
}