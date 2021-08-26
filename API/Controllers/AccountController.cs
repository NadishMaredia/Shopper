using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.Dto;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataDbContext _context;
        public AccountController(DataDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthDto>> LoginUser(RegisterDto registerDto)
        {
            var user = await _context.Users
                .SingleOrDefaultAsync(u => u.Username == registerDto.Username);

            if (user == null) return Unauthorized("Invalid username");

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password));

            for(int i = 0;i < computedHash.Length;i++) {
                if(computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");
            }

            return new AuthDto
            {
                Username = user.Username,
                isAdmin = user.isAdmin
            };
        }

        [HttpPost("register")]
        public async Task<ActionResult<AuthDto>> RegisterUser(RegisterDto registerDto) 
        {
            if (await UserExists(registerDto.Username)) return BadRequest("Username already exists!");

            using var hmac = new HMACSHA512();

            var user = new AppUser
            {
                Username = registerDto.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key,
                isAdmin = false
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new AuthDto
            {
                Username = user.Username,
                isAdmin = user.isAdmin
            };
        }

        private async Task<bool> UserExists(string username)
        {
            return await _context.Users.AnyAsync(a => a.Username == username.ToLower());
        }
    }
}