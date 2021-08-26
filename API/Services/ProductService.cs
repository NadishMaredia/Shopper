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

        public async Task<string> DeleteProduct(int id)
        {
            var productFromDb = await _context.Products.FindAsync(id);

            if (productFromDb != null) {
                _context.Products.Remove(productFromDb);
                await _context.SaveChangesAsync();
                return "Product Deleted!";
            }

            return "Please try again! Product not found";
        }

        public async Task<IEnumerable<Product>> GetAllProducts()
        {
            return await _context.Products.ToListAsync();
        }

        public async Task<Product> GetProductById(int id)
        {
            return await _context.Products.SingleOrDefaultAsync(p => p.Id == id);
        }

        public async Task<Product> UpdateProduct(Product product)
        {
            var productFromDb = await _context.Products.FindAsync(product.Id);

            if (productFromDb == null) return new Product{};

            productFromDb.Title = product.Title;
            productFromDb.Price = product.Price;
            productFromDb.Category = product.Category;
            productFromDb.ImageUrl = product.ImageUrl;

            await _context.SaveChangesAsync();

            return productFromDb;
        }
    }
}