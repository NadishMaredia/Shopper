using System.ComponentModel.DataAnnotations;

namespace API.Dto
{
    public class ProductDto
    {
        [Required]
        public string Title { get; set; }
        [Required]
        public double Price { get; set; }
        [Required]
        public string Category { get; set; }
        [Required]
        public string ImageUrl { get; set; }
    }
}