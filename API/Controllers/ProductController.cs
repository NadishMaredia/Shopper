using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dto;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProductController : BaseApiController
    {
        private readonly IProduct _product;
        public ProductController(IProduct product)
        {
            _product = product;

        }
        [HttpGet("")]
        public async Task<IEnumerable<Product>> GetAllProducts()
        {
            var products = await _product.GetAllProducts();

            return products;
        }

        [HttpPost("add")]
        public async Task<string> AddProduct(ProductDto productDto)
        {
            return await _product.AddProduct(productDto);
        }

        [HttpGet("{id}")]
        public async Task<Product> GetProductById(int id)
        {
            var product = await _product.GetProductById(id);

            return product;
        }

        [HttpPut("update")]
        public async Task<ActionResult<Product>> UpdateProduct(Product product)
        {
            var productUpdated = await _product.UpdateProduct(product);

            if (productUpdated.Id == 0) return NotFound();

            return productUpdated;
        }

        [HttpDelete("delete/{id}")]
        public async Task<string> DeleteProduct(int id)
        {
            return await _product.DeleteProduct(id);
        }
    }
}