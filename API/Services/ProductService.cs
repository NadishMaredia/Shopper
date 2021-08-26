using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.Dto;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class ProductService : IProduct
    {
        private readonly DataDbContext _context;

        public ProductService(DataDbContext context)
        {
            _context = context;
        }
        public async Task<string> AddProduct(ProductDto productDto)
        {
            var product = new Product
            {
                Title = productDto.Title,
                Category = productDto.Category,
                Price = productDto.Price,
                ImageUrl = productDto.ImageUrl
            };

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return "Product Saved!";
        }

        public async Task<IEnumerable<Product>> GetAllProducts()
        {
            return await _context.Products.ToListAsync();
        }
    }
}