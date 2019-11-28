using System.Data.Entity;

namespace Com.Colin.UI.Models
{
    public class RestaurantEntities : DbContext
    {
        private const string connectionString = @"server=(localdb)\v11.0;database=Restaurant;trusted_connection=true";

        public RestaurantEntities()
          : base(connectionString)
        {
        }
        public DbSet<Menu2> Menus { get; set; }
        public DbSet<MenuCard> MenuCards { get; set; }
    }
}