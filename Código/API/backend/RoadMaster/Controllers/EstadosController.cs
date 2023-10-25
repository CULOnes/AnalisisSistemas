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
    [Route("api/Estados")]
    [ApiController]
    public class EstadosController : ControllerBase
    {
        private readonly AppDBContext db;
        private readonly IConfiguration Configuration;
        private readonly Login log = new Login();

        public EstadosController(AppDBContext context, IConfiguration configuration)
        {
            db = context;
            Configuration = configuration;
        }

        [HttpGet("estados")]
        public async ValueTask<ActionResult<EstadosResponseDTO>> Get()
        {
            try
            {
                var estados = db.Estados.ToArray();
                return Ok(estados);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }

        [HttpPut("actualizar")]
        public async ValueTask<ActionResult<EstadosResponseDTO>> Actualizar(EstadosRequestDTO estados)
        {
            try
            {

                var estado = db.Estados.Find(estados.Est_Codigo);

                estado.Est_Nombre = estados.Est_Nombre;
                estado.Est_Descripcion = estados.Est_Descripcion;
                estado.Est_Baja = estados.Est_Baja;

                db.Entry(estado).State = EntityState.Modified;
                db.SaveChanges();
                return Ok(estado);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }

        [HttpPost("registroestados")]
        public async ValueTask<ActionResult<EstadosResponseDTO>> Crear([FromBody] EstadosRequestDTO estados)
        {
            try
            {

                var estado = new Estados
                {
                    //Usu_Codigo = id,
                    Est_Codigo = estados.Est_Codigo,
                    Est_Nombre = estados.Est_Nombre,
                    Est_Descripcion = estados.Est_Descripcion,
                    Est_Baja = estados.Est_Baja
                };

                await db.Estados.AddAsync(estado);
                db.SaveChanges();
                return Ok(estado);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }

        [HttpPut("eliminar")]
        public async ValueTask<ActionResult<EstadosResponseDTO>> Eliminar([FromBody] EstadosRequestDTO estados)
        {
            try
            {

                var estado = db.Estados.Find(estados.Est_Codigo);
                if (estado != null)
                {
                    db.Estados.Remove(estado);
                    db.SaveChanges();
                }
                return Ok(estado);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }
    }
}