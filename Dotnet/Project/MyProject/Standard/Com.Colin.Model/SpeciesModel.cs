using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Com.Colin.Model
{
    /// <summary>
    /// 物种
    /// </summary>
    [Table("T_Species")]
    public class SpeciesModel
    {
        /// <summary>
        /// virtual表示该列表为延迟加载
        /// </summary>
        [NotMapped]
        public virtual ICollection<AnimalModel> Animals { get; set; }

        public int Id
        {
            get; set;
        }

        public string Name
        {
            get; set;
        }
    }
}
