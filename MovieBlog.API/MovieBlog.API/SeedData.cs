using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using MovieBlog.API.Entities;

namespace MovieBlog.API
{
    public class SeedData
    {
        private readonly ModelBuilder modelBuilder;

        public SeedData(ModelBuilder modelBuilder)
        {
            this.modelBuilder = modelBuilder;
        }

        public void Seed()
        {
            modelBuilder.Entity<Genre>().HasData(
                   new Genre() { Id = 1, Name = "Action" },
                   new Genre() { Id = 2, Name = "Adventure" },
                   new Genre() { Id = 3, Name = "Animation" },
                   new Genre() { Id = 4, Name = "Comedy" },
                   new Genre() { Id = 5, Name = "Drama" },
                   new Genre() { Id = 6, Name = "Sci-Fi" },
                   new Genre() { Id = 7, Name = "Fantasy" },
                   new Genre() { Id = 8, Name = "Horror" },
                   new Genre() { Id = 9, Name = "Romance" },
                   new Genre() { Id = 10, Name = "History" },
                   new Genre() { Id = 11, Name = "Music" },
                   new Genre() { Id = 12, Name = "Thriller" }
            );

        }
    }
}
