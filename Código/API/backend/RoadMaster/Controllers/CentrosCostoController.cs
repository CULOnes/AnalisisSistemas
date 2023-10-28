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
    [Route("api/CentrosCosto")]
    [ApiController]
    public class CentrosCostoController : ControllerBase
    {
        private readonly AppDBContext db;
        private readonly IConfiguration Configuration;
        private readonly Login log = new Login();

        public CentrosCostoController(AppDBContext context, IConfiguration configuration)
        {
            db = context;
            Configuration = configuration;
        }

        [HttpGet("centroscosto")]
        public async ValueTask<ActionResult<CentrosCostoResponseDTO>> Get()
        {
            try
            {
                var centroscosto = db.CentrosCosto.ToArray();
                return Ok(centroscosto);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }

        [HttpPut("actualizar")]
        public async ValueTask<ActionResult<CentrosCostoResponseDTO>> Actualizar(CentrosCostoRequestDTO centroscosto)
        {
            try
            {

                var centrocosto = db.CentrosCosto.Find(centroscosto.CeC_Codigo);

                centrocosto.Cue_Codigo = centroscosto.Cue_Codigo;
                centrocosto.CeC_Nombre = centroscosto.CeC_Nombre;
                centrocosto.CeC_Descripcion = centroscosto.CeC_Descripcion;

                db.Entry(centrocosto).State = EntityState.Modified;
                db.SaveChanges();
                return Ok(centrocosto);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }

        [HttpPost("registrocentroscosto")]
        public async ValueTask<ActionResult<CentrosCostoResponseDTO>> Crear([FromBody] CentrosCostoRequestDTO centroscosto)
        {
            try
            {
                var centrocosto = new CentrosCosto
                {
                    Cue_Codigo = centroscosto.Cue_Codigo,
                    CeC_Nombre = centroscosto.CeC_Nombre,
                    CeC_Descripcion = centroscosto.CeC_Descripcion
                };

                await db.CentrosCosto.AddAsync(centrocosto);
                db.SaveChanges();
                return Ok(centrocosto);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }

        [HttpPut("eliminar")]
        public async ValueTask<ActionResult<CentrosCostoResponseDTO>> Eliminar([FromBody] CentrosCostoRequestDTO centroscosto)
        {
            try
            {

                var centrocosto = db.CentrosCosto.Find(centroscosto.CeC_Codigo);
                if (centrocosto != null)
                {
                    db.CentrosCosto.Remove(centrocosto);
                    db.SaveChanges();
                }
                return Ok(centrocosto);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }
    }
}