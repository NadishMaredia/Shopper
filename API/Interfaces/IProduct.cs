using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dto;
using API.Entities;

namespace API.Interfaces
{
    public interface IProduct
    {
        Task<string> AddProduct(ProductDto productDto);
        Task<IEnumerable<Product>> GetAllProducts();
    }
}