using Microsoft.EntityFrameworkCore;

namespace Com.Colin.Core.Models
{
    public class BomContext : DbContext
    {
        public BomContext(DbContextOptions<BomContext> options)
            : base(options)
        {
        }

        public DbSet<WTPart> WTParts { get; set; }
    }
}