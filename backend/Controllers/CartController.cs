using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Data;
using System.Linq;
using System.Threading.Tasks;
using System;

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
        [HttpPost("checkout")]
        public async Task<IActionResult> Checkout(CheckoutDto dto)
        {
            if (dto == null || dto.Items == null || !dto.Items.Any())
                return BadRequest("No items to checkout.");

            var order = new Order
            {
                //TODO : Testing | Remove hardcoded UserId
                // UserId = dto.UserId,
                UserId = 1,
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