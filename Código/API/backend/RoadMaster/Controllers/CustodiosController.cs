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
    [Route("api/Custodios")]
    [ApiController]
    public class CustodiosController : ControllerBase
    {
        private readonly AppDBContext db;
        private readonly IConfiguration Configuration;
        private readonly Login log = new Login();

        public CustodiosController(AppDBContext context, IConfiguration configuration)
        {
            db = context;
            Configuration = configuration;
        }

        [HttpGet("custodios")]
        public async ValueTask<ActionResult<CustodiosResponseDTO>> Get()
        {
            try
            {
                var custodios = db.Custodios.ToArray();
                return Ok(custodios);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }

        [HttpPut("actualizar")]
        public async ValueTask<ActionResult<CustodiosResponseDTO>> Actualizar(CustodiosRequestDTO custodios)
        {
            try
            {

                var custodio = db.Custodios.Find(custodios.Cus_Codigo);

                custodio.Suc_Codigo = custodios.Suc_Codigo;
                custodio.Dep_Codigo = custodios.Dep_Codigo;
                custodio.Cus_DPI = custodios.Cus_DPI;
                custodio.Cus_Nombre = custodios.Cus_Nombre;
                custodio.Cus_Apellido = custodios.Cus_Apellido;
                custodio.Cus_Cargo = custodios.Cus_Cargo;

                db.Entry(custodio).State = EntityState.Modified;
                db.SaveChanges();
                return Ok(custodio);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }

        [HttpPost("registrocustodios")]
        public async ValueTask<ActionResult<CustodiosResponseDTO>> Crear([FromBody] CustodiosRequestDTO custodios)
        {
            try
            {
                var custodio = new Custodios
                {
                    //Usu_Codigo = id,
                    Suc_Codigo = custodios.Suc_Codigo,
                    Dep_Codigo = custodios.Dep_Codigo,
                    Cus_DPI = custodios.Cus_DPI,
                    Cus_Nombre = custodios.Cus_Nombre,
                    Cus_Apellido = custodios.Cus_Apellido,
                    Cus_Cargo = custodios.Cus_Cargo
                };

                await db.Custodios.AddAsync(custodio);
                db.SaveChanges();
                return Ok(custodio);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }

        [HttpPut("eliminar")]
        public async ValueTask<ActionResult<CustodiosResponseDTO>> Eliminar([FromBody] CustodiosRequestDTO custodios)
        {
            try
            {

                var custodio = db.Custodios.Find(custodios.Cus_Codigo);
                if (custodio != null)
                {
                    db.Custodios.Remove(custodio);
                    db.SaveChanges();
                }
                return Ok(custodio);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }
    }
}