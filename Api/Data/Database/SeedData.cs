using Api.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Api.Data.Database
{
    /// <summary>
    /// seed data
    /// </summary>
    public static class SeedData
    {
        /// <summary>
        /// seed data
        /// </summary>
        /// <param name="builder"></param>
        public static void Seed(ModelBuilder builder)
        {
            // Example of seeding data
            //     builder.Entity<SongEntity>().HasData(new List<SongEntity> {
            //     new() {
            //         Id = new Guid("ad04f45e-fa18-4cbc-9b58-3bfe39eb26ae"),
            //         Album = "Some Album",
            //         TrackName = "self conscious",
            //         TrackNumber = 1,
            //     }
            // });
            builder.Entity<RoleEntity>().HasData(new List<RoleEntity> {
            new() {
                Id = "4f3050e0-6300-487e-9bd1-a8862f40b2d1",
                Name = "Admin",
                NormalizedName = "ADMIN"
            },
        });
        }
    }

}