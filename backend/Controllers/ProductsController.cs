using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;
using backend.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IHubContext<NotificationHub> _hub;

    public ProductsController(AppDbContext context, IHubContext<NotificationHub> hub)
    {
        _context = context;
        _hub = hub;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
    {
        return await _context.Products.Include(p => p.Category).ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProduct(int id)
    {
        var product = await _context.Products.Include(p => p.Category)
                                             .Include(p => p.Reviews)
                                             .FirstOrDefaultAsync(p => p.Id == id);

        return product is null ? NotFound() : product;
    }

    [HttpPost]
    public async Task<ActionResult<Product>> CreateProduct(Product product)
    {
        _context.Products.Add(product);
        await _context.SaveChangesAsync();

        await _hub.Clients.All.SendAsync("ReceiveMessage", $"Product '{product.Name}' was added!");

        return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
    }
}
