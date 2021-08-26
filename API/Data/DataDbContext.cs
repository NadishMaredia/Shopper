using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataDbContext : DbContext
    {
        public DataDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<AppUser> Users { get; set; }
        public DbSet<Product> Products { get; set; }
    }
}