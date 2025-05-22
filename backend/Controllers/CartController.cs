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

        [Authorize]
        [HttpGet("users/{userId}")]
        public async Task<IActionResult> GetUserOrders(string userId)
        {
            var orders = await _context.Orders
                .Where(o => o.ApplicationUserId == userId)
                .Include(o => o.Items)
                .ThenInclude(oi => oi.Product)
                .OrderByDescending(o => o.OrderedAt)
                .ToListAsync();

            return Ok(orders.Select(o => new
            {
                o.Id,
                o.OrderedAt,
                Items = o.Items.Select(i => new
                {
                    i.Product.Name,
                    i.Quantity,
                    i.Product.Price
                }),
                Total = o.Items.Sum(i => i.Quantity * i.Product.Price)
            }));
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