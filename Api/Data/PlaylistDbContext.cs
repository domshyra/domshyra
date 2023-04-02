using Microsoft.EntityFrameworkCore;

public class PlaylistDbContext : DbContext
{
    public PlaylistDbContext(DbContextOptions<PlaylistDbContext> options) : base(options) { }
    public DbSet<PlaylistRatingEntity> Ratings => Set<PlaylistRatingEntity>();

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        var folder = Environment.SpecialFolder.LocalApplicationData;
        var path = Environment.GetFolderPath(folder);
        options.UseSqlite($"Data Source={Path.Join(path, "playlistRating.db")}");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        SeedData.Seed(modelBuilder);
    }
}
