using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Com.Colin.UI.Models
{
    public class Menu
    {
        public int Id { get; set; }
        [Required, StringLength(25)]
        public string Text { get; set; }
        [DisplayName("Price"), DisplayFormat(DataFormatString = "{0:C}")]
        public double Price { get; set; }
        [DataType(DataType.Date)]
        public DateTime Date { get; set; }
        [StringLength(10)]
        public string Category { get; set; }
    }

    public class Menu2
    {
        public int Id { get; set; }

        public string Text { get; set; }
        public decimal Price { get; set; }
        public bool Active { get; set; }
        public int Order { get; set; }
        public string Type { get; set; }
        public DateTime Day { get; set; }

        public int MenuCardId { get; set; }
        public virtual MenuCard MenuCard { get; set; }
    }

    public class MenuCard
    {

        public int Id { get; set; }
        [MaxLength(50)]
        public string Name { get; set; }
        public bool Active { get; set; }
        public int Order { get; set; }

        public virtual List<Menu2> Menus { get; set; }
    }
}