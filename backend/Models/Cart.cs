namespace backend.Models;


public class CheckoutDto
{
    public string UserId { get; set; } = "";
    public List<CartItemDto> Items { get; set; }
}

public class CartItemDto
{
    public int ProductId { get; set; }
    public int Quantity { get; set; }
}