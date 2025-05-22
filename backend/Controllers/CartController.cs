using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Data;
using System.Linq;
using System.Threading.Tasks;
using System;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CartController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CartController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("items/{userId}")]
        public async Task<ActionResult<IEnumerable<OrderItem>>> GetCartItems(string userId)
        {
            var cartItems = await _context.Orders
                .Include(o => o.Items)
                .ThenInclude(i => i.Product)
                .Where(o => o.ApplicationUserId == userId)
                .SelectMany(o => o.Items)
                .Select(i => new OrderItem
                {
                    ProductId = i.ProductId,
                    Quantity = i.Quantity,
                    Product = new Product
                    {
                        Id = i.Product.Id,
                        Name = i.Product.Name,
                        Price = i.Product.Price,
                        ImageUrl = i.Product.ImageUrl
                    }
                })
                .ToListAsync();
            return cartItems;
        }


        [Authorize]
        [HttpPost("checkout")]
        public async Task<IActionResult> Checkout(CheckoutDto dto)
        {
            if (dto == null || dto.Items == null || !dto.Items.Any())
                return BadRequest("No items to checkout.");

            var order = new Order
            {
                //TODO : Testing | Remove hardcoded UserId
                // UserId = 1,
                ApplicationUserId = dto.UserId,
                
                OrderedAt = DateTime.UtcNow,
                Items = dto.Items.Select(i => new OrderItem
                {
                    ProductId = i.ProductId,
                    Quantity = i.Quantity
                }).ToList()
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Checkout successful", OrderId = order.Id });
        }
    }
}