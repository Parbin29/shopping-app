namespace backend.Models;

public class Order
{
    public int Id { get; set; }
    public DateTime OrderedAt { get; set; } = DateTime.UtcNow;
    public int UserId { get; set; }
    public ApplicationUser? User { get; set; }

    public ICollection<OrderItem> Items { get; set; } = new List<OrderItem>();
}
