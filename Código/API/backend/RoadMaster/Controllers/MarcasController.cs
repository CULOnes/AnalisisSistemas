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
    [Route("api/Marcas")]
    [ApiController]
    public class MarcasController : ControllerBase
    {
        private readonly AppDBContext db;
        private readonly IConfiguration Configuration;
        private readonly Login log = new Login();

        public MarcasController(AppDBContext context, IConfiguration configuration)
        {
            db = context;
            Configuration = configuration;
        }

        [HttpGet("marcas")]
        public async ValueTask<ActionResult<MarcasResponseDTO>> Get()
        {
            try
            {
                var marcas = db.Marcas.ToArray();
                return Ok(marcas);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }

        [HttpPut("actualizar")]
        public async ValueTask<ActionResult<MarcasResponseDTO>> Actualizar(MarcasRequestDTO marcas)
        {
            try
            {

                var marca = db.Marcas.Find(marcas.Mar_Codigo);

                marca.Mar_Nombre = marcas.Mar_Nombre;
                marca.Mar_Descripcion = marcas.Mar_Descripcion;

                db.Entry(marca).State = EntityState.Modified;
                db.SaveChanges();
                return Ok(marca);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }

        [HttpPost("registromarca")]
        public async ValueTask<ActionResult<MarcasResponseDTO>> Crear([FromBody] MarcasRequestDTO marcas)
        {
            try
            {
                var marca = new Marcas
                {
                    //Cli_Codigo = id,
                    Mar_Nombre = marcas.Mar_Nombre,
                    Mar_Descripcion = marcas.Mar_Descripcion,
                };
                await db.Marcas.AddAsync(marca);
                db.SaveChanges();
                return Ok(marca);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }

        [HttpPut("eliminar")]
        public async ValueTask<ActionResult<MarcasResponseDTO>> Eliminar([FromBody] MarcasRequestDTO marcas)
        {
            try
            {

                var marca = db.Marcas.Find(marcas.Mar_Codigo);
                if (marca != null)
                {
                    db.Marcas.Remove(marca);
                    db.SaveChanges();
                }
                return Ok(marca);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }
    }
}