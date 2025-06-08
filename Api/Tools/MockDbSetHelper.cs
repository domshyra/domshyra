using Api.Data.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace Api.Tools
{
    /// <summary>
    /// Provides helper methods for mocking DbSet operations in tests.
    /// </summary>
    public static class MockDbSetHelper
    {
        /// <summary>
        /// Creates a fake EntityEntry for the provided entity.
        /// used for testing purposes
        /// </summary>
        /// <typeparam name="T"></typeparam>
        public static EntityEntry<T> CreateFakeEntityEntry<T>(T entity) where T : class
        {
            var options = new DbContextOptionsBuilder<ExampleDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;


            var context = new ExampleDbContext(options);
            return context.Entry(entity);
        }

    }

}
