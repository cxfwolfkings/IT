using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Com.Colin.Model
{
    public class SpeciesValidation : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            if (value == null) // Checking for Empty Value
            {
                return new ValidationResult("Please Provide Species");
            }
            else
            {
                if (!value.ToString().Contains("@"))
                {
                    return new ValidationResult("Species should contain @");
                }
            }
            return ValidationResult.Success;
        }
    }

    /// <summary>
    /// 动物
    /// </summary>
    [Table("T_Animal")]
    public class AnimalModel
    {
        public int Id { get; set; }
        /// <summary>
        /// 名称
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 生日
        /// </summary>
        public DateTime? BirthDay { get; set; }
        /// <summary>
        /// 年龄
        /// </summary>
        [Range(typeof(int), "1", "100", ErrorMessage = "Put a proper Age value between 1 and 100")]
        public int Age { get; set; }

        /// <summary>
        /// 物种ID
        /// </summary>
        public int SpeciesId { get; set; }

        /// <summary>
        /// 物种
        /// virtual 表示延迟加载
        /// </summary>
        [SpeciesValidation]
        [NotMapped]
        public virtual SpeciesModel Species { get; set; }

        /// <summary>
        /// 是否宠物
        /// </summary>
        public bool IsPet { get; set; }
    }

}