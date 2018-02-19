using Microsoft.EntityFrameworkCore;
using Api.Entities;
using Api.Models;

namespace Api.Helpers
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Note> Notes { get; set; }
        public DbSet<LandMark> LandMarks { get; set; }
    }
}