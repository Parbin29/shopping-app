using Microsoft.AspNetCore.Identity;
namespace backend.Models;

public class ApplicationUser : IdentityUser
{
    public int Id { get; set; }
    // public string Username { get; set; } = "";
    // public string PasswordHash { get; set; } = ""; // For demo only. Use hashing in production.
    public string Role { get; set; } = "Customer"; // Admin or Customer

    public ICollection<Order> Orders { get; set; } = new List<Order>();
}
