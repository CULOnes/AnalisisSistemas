using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using RoadMaster.DTOs.Request;
using RoadMaster.DTOs.Responses;
using RoadMaster.Repositories;
using RoadMaster.Repositories.Entities;
using RoadMaster.Utils;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
//using RoadMaster.Utils;

namespace RoadMaster.Controllers
{
    [Route("api/Sucursales")]
    [ApiController]
    public class SucursalesController : ControllerBase
    {
        private readonly AppDBContext db;
        private readonly IConfiguration Configuration;
        private readonly Login log = new Login();

        public SucursalesController(AppDBContext context, IConfiguration configuration)
        {
            db = context;
            Configuration = configuration;
        }

        [HttpGet("sucursales")]
        public async ValueTask<ActionResult<SucursalesResponseDTO>> Get()
        {
            try
            {
                var sucursales = db.Sucursales.ToArray();
                return Ok(sucursales);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }

        [HttpPut("actualizar")]
        public async ValueTask<ActionResult<SucursalesResponseDTO>> Actualizar(SucursalesRequestDTO sucursales)
        {
            try
            {

                var sucursal = db.Sucursales.Find(sucursales.Suc_Codigo);

                sucursal.Suc_Nombre = sucursales.Suc_Nombre;

                db.Entry(sucursal).State = EntityState.Modified;
                db.SaveChanges();
                return Ok(sucursal);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }

        [HttpPost("registrosucursales")]
        public async ValueTask<ActionResult<SucursalesResponseDTO>> Crear([FromBody] SucursalesRequestDTO sucursales)
        {
            try
            {

                var sucursal = new Sucursales
                {
                    Suc_Nombre = sucursales.Suc_Nombre,
                };

                await db.Sucursales.AddAsync(sucursal);
                db.SaveChanges();
                return Ok(sucursal);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }

        [HttpPut("eliminar")]
        public async ValueTask<ActionResult<SucursalesResponseDTO>> Eliminar([FromBody] SucursalesRequestDTO sucursales)
        {
            try
            {

                var sucursal = db.Sucursales.Find(sucursales.Suc_Codigo);
                if (sucursal != null)
                {
                    db.Sucursales.Remove(sucursal);
                    db.SaveChanges();
                }
                return Ok(sucursal);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }
    }
}