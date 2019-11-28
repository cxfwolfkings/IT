using System.Collections.Generic;

namespace Com.Colin.WPF
{
    public class Countries
    {
        public static IEnumerable<Country> GetCountries()
        {
            return new List<Country>
            {
                new Country { Name = "Austria", ImagePath = "images/Austria.bmp" },
                new Country { Name = "Germany", ImagePath = "images/Germany.bmp" },
                new Country { Name = "Norway", ImagePath = "images/Norway.bmp" },
                new Country { Name = "USA", ImagePath = "images/USA.bmp" }
            };
        }
    }
}
