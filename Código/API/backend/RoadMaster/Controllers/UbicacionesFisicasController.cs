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
    [Route("api/UbicacionesFisicas")]
    [ApiController]
    public class UbicacionesFisicasController : ControllerBase
    {
        private readonly AppDBContext db;
        private readonly IConfiguration Configuration;
        private readonly Login log = new Login();

        public UbicacionesFisicasController(AppDBContext context, IConfiguration configuration)
        {
            db = context;
            Configuration = configuration;
        }

        [HttpGet("ubicacionesfisicas")]
        public async ValueTask<ActionResult<UbicacionesFisicasResponseDTO>> Get()
        {
            try
            {
                var ubicacionesfisicas = db.UbicacionesFisicas.ToArray();
                return Ok(ubicacionesfisicas);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }

        [HttpPut("actualizar")]
        public async ValueTask<ActionResult<UbicacionesFisicasResponseDTO>> Actualizar(UbicacionesFisicasRequestDTO ubicacionesfisicas)
        {
            try
            {

                var ubicacionfisica = db.UbicacionesFisicas.Find(ubicacionesfisicas.UbF_Codigo);

                ubicacionfisica.UbF_Ubicacion = ubicacionesfisicas.UbF_Ubicacion;
                ubicacionfisica.UbF_Descripcion = ubicacionesfisicas.UbF_Descripcion;

                db.Entry(ubicacionfisica).State = EntityState.Modified;
                db.SaveChanges();
                return Ok(ubicacionfisica);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }

        [HttpPost("registroubicacionesfisicas")]
        public async ValueTask<ActionResult<UbicacionesFisicasResponseDTO>> Crear([FromBody] UbicacionesFisicasRequestDTO ubicacionesfisicas)
        {
            try
            {
                var ubicacionnfisica = new UbicacionesFisicas
                {
                    UbF_Ubicacion = ubicacionesfisicas.UbF_Ubicacion,
                    UbF_Descripcion = ubicacionesfisicas.UbF_Descripcion
                };

                await db.UbicacionesFisicas.AddAsync(ubicacionnfisica);
                db.SaveChanges();
                return Ok(ubicacionnfisica);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }

        [HttpPut("eliminar")]
        public async ValueTask<ActionResult<UbicacionesFisicasResponseDTO>> Eliminar([FromBody] UbicacionesFisicasRequestDTO ubicacionesfisicas)
        {
            try
            {

                var ubicacionfisica = db.UbicacionesFisicas.Find(ubicacionesfisicas.UbF_Codigo);
                if (ubicacionfisica != null)
                {
                    db.UbicacionesFisicas.Remove(ubicacionfisica);
                    db.SaveChanges();
                }
                return Ok(ubicacionfisica);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }
    }
}