using Api.Data.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Api.Data.Database
{
    //?EF tools here
    //?https://learn.microsoft.com/en-us/ef/core/cli/dotnet

    //?EF Migrations here
    //?https://docs.microsoft.com/en-us/ef/core/managing-schemas/migrations/?tabs=dotnet-core-cli


    /// <summary>
    /// Database context for the Albums.
    /// </summary> 
    public class ExampleDbContext : IdentityDbContext<UserEntity, RoleEntity, string>
    {
        public ExampleDbContext()
        {
            //for unit tests            
        }
        /// <summary>
        /// Initializes a new instance of the <see cref="ExampleDbContext"/> class.
        /// </summary>
        /// <param name="options">The options to be used by a <see cref="ExampleDbContext"/>.</param>
        public ExampleDbContext(DbContextOptions<ExampleDbContext> options) : base(options) { }



        /// <summary>
        /// Configures the schema needed for the identity framework.
        /// </summary>
        /// <param name="modelBuilder">The builder being used to construct the model for this context.</param>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            SeedData.Seed(modelBuilder);

        }
    }
}