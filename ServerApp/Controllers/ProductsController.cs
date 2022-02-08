using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AspNetCoreWebApi.Data;
using AspNetCoreWebApi.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AspNetCoreWebApi.Controllers
{
    [ApiController]
    [Route("myapi/[controller]")]
    [Authorize]
    public class ProductsController : ControllerBase
    {
        private readonly MyContext _myContext;

        public ProductsController(MyContext myContext)
        {
            _myContext = myContext;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetProducts()
        {
            var products = await _myContext.Products.ToListAsync();
            if (products == null)
                return NotFound();

            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var p = await _myContext.Products.FindAsync(id);
            if (p == null)
                return NotFound();

            return Ok(p);
        }

        [HttpPost]
        public async Task<IActionResult> CreateProduct(Product entity)
        {
            try
            {
                await _myContext.Products.AddAsync(entity);
                await _myContext.SaveChangesAsync();
            }
            catch (Exception)
            {
                return BadRequest();
            }

            return CreatedAtAction(nameof(GetProductById), new { id = entity.ProductId }, entity);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var p = await _myContext.Products.FindAsync(id);
            if (p == null)
                return NotFound();

            _myContext.Products.Remove(p);
            try
            {
                await _myContext.SaveChangesAsync();
            }
            catch (Exception)
            {
                return BadRequest();
            }

            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, Product entity)
        {
            if (id != entity.ProductId)
                return BadRequest();

            var p = await _myContext.Products.FindAsync(id);
            p.Name = entity.Name;
            p.Price = entity.Price;

            try
            {
                await _myContext.SaveChangesAsync();
            }
            catch (Exception)
            {
                return BadRequest();
            }

            return Ok(p);
        }
    }
}