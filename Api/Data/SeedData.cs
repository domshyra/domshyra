using Microsoft.EntityFrameworkCore;

public static class SeedData
{
    public static void Seed(ModelBuilder builder)
    {
        builder.Entity<PlaylistRatingEntity>().HasData(new List<PlaylistRatingEntity> {
            new PlaylistRatingEntity {
                Id = new Guid("cc89279a-1ebb-49c3-9a0d-f704c61b5d0a"),
                Rating = 5,
                SpotifyId = "4wPdda9xSZy2ffI47Bo696"
            },
        });
    }
}