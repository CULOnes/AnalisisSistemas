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
    [Route("api/Cuentas")]
    [ApiController]
    public class CuentasController : ControllerBase
    {
        private readonly AppDBContext db;
        private readonly IConfiguration Configuration;
        private readonly Login log = new Login();

        public CuentasController(AppDBContext context, IConfiguration configuration)
        {
            db = context;
            Configuration = configuration;
        }

        [HttpGet("cuentas")]
        public async ValueTask<ActionResult<CuentasResponseDTO>> Get()
        {
            try
            {
                var cuentas = db.Cuentas.ToArray();
                return Ok(cuentas);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }

        [HttpPut("actualizar")]
        public async ValueTask<ActionResult<CuentasResponseDTO>> Actualizar(CuentasRequestDTO cuentas)
        {
            try
            {

                var cuenta = db.Cuentas.Find(cuentas.Cue_Codigo);

                cuenta.Cue_Nombre = cuentas.Cue_Nombre;
                cuenta.Cue_Descripcion = cuentas.Cue_Descripcion;
                cuenta.Cue_Tipo = cuentas.Cue_Tipo;

                db.Entry(cuenta).State = EntityState.Modified;
                db.SaveChanges();
                return Ok(cuenta);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }

        [HttpPost("registrocuentas")]
        public async ValueTask<ActionResult<CuentasResponseDTO>> Crear([FromBody] CuentasRequestDTO cuentas)
        {
            try
            {

                var cuenta = new Cuentas
                {
                    //Usu_Codigo = id,
                    Cue_Nombre = cuentas.Cue_Nombre,
                    Cue_Descripcion = cuentas.Cue_Descripcion,
                    Cue_Tipo = cuentas.Cue_Tipo
                };

                await db.Cuentas.AddAsync(cuenta);
                db.SaveChanges();
                return Ok(cuenta);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }

        [HttpPut("eliminar")]
        public async ValueTask<ActionResult<CuentasResponseDTO>> Eliminar([FromBody] CuentasRequestDTO cueentas)
        {
            try
            {

                var cuenta = db.Cuentas.Find(cueentas.Cue_Codigo);
                if (cuenta != null)
                {
                    db.Cuentas.Remove(cuenta);
                    db.SaveChanges();
                }
                return Ok(cuenta);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }
    }
}