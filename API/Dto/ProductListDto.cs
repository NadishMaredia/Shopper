namespace API.Dto
{
    public class ProductListDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public double Price { get; set; }
        public string Category { get; set; }
        public string ImageUrl { get; set; }
    }
}