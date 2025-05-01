namespace backend.Models;

public class User
{
    public int Id { get; set; }
    public string Username { get; set; } = "";
    public string Password { get; set; } = ""; // For demo only. Use hashing in production.
    public string Role { get; set; } = "Customer"; // Admin or Customer

    public ICollection<Order> Orders { get; set; } = new List<Order>();
}
