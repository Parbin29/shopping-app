using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Data;
using System.Security.Cryptography;
using System.Text;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IConfiguration _config;

        public AuthController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, SignInManager<ApplicationUser> signInManager, IConfiguration config)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _signInManager = signInManager;
            _config = config;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            try
            {
                var userExists = await _userManager.FindByNameAsync(dto.UserName);
                if (userExists != null)
                    return BadRequest("ApplicationUser already exists");

                var hashedPassword = HashPassword(dto.Password);
                var user = new ApplicationUser
                {
                    UserName = dto.UserName,
                    PasswordHash = hashedPassword,
                    Role = dto.Role
                };

                var result = await _userManager.CreateAsync(user, dto.Password);

                if (!result.Succeeded)
                    return BadRequest(result.Errors);

                // Create role if it doesn't exist
                await CreateRoleAsync(dto.Role);
                // Assign role to user
                await _userManager.AddToRoleAsync(user, dto.Role);
                // Optionally, you can generate a token here and return it

                return Ok("ApplicationUser registered successfully");
            }
            catch (Exception)
            {
                // Optionally log the exception here
                return StatusCode(500, "Registration failed. Please try again later.");
            }

        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            try
            {
                var user = await _userManager.FindByNameAsync(dto.UserName);
                if (user == null || !await _userManager.CheckPasswordAsync(user, dto.Password))
                    return Unauthorized("Invalid username or password");

                // signin user
                var result = await _signInManager.PasswordSignInAsync(user, dto.Password, isPersistent: false, lockoutOnFailure: false);
                if (!result.Succeeded)
                    return Unauthorized("Invalid username or password");


                // Generate token or simply return success

                var token = GenerateJwtToken(user);

                var cookieOptions = new CookieOptions
                {
                    HttpOnly = true,
                    Secure = false, // only if your site runs over HTTPS
                    SameSite = SameSiteMode.Strict,
                    Expires = DateTime.UtcNow.AddMinutes(60)
                };

                Response.Cookies.Append("jwt", token, cookieOptions);

                return Ok(new
                {
                    Message = "Login successful",
                    UserId = user.Id,
                    UserName = user.UserName,
                });
            }
            catch (Microsoft.Data.SqlClient.SqlException)
            {
                // Database connection or SQL error
                return StatusCode(500, "A database error occurred. Please try again later.");
            }
            catch (Exception)
            {
                // Other unhandled errors
                return StatusCode(500, "An internal server error occurred. Please try again later.");
            }
        }

        // Create role async private method
        private async Task CreateRoleAsync(string roleName)
        {
            if (!await _roleManager.RoleExistsAsync(roleName))
            {
                var role = new IdentityRole(roleName);
                await _roleManager.CreateAsync(role);
            }
        }

        private string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var bytes = Encoding.UTF8.GetBytes(password);
            var hash = sha256.ComputeHash(bytes);
            return Convert.ToBase64String(hash);
        }

        private string GenerateJwtToken(IdentityUser user)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(double.Parse(_config["Jwt:ExpireMinutes"])),
                signingCredentials: creds
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

    public class RegisterDto
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
    }

    public class LoginDto
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }


}





