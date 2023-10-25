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
    [Route("api/Departamentos")]
    [ApiController]
    public class DepartamentosController : ControllerBase
    {
        private readonly AppDBContext db;
        private readonly IConfiguration Configuration;
        private readonly Login log = new Login();

        public DepartamentosController(AppDBContext context, IConfiguration configuration)
        {
            db = context;
            Configuration = configuration;
        }

        [HttpGet("departamentos")]
        public async ValueTask<ActionResult<DepartamentosResponseDTO>> Get()
        {
            try
            {
                var departamentos = db.Departamentos.ToArray();
                return Ok(departamentos);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }

        [HttpPut("actualizar")]
        public async ValueTask<ActionResult<DepartamentosResponseDTO>> Actualizar(DepartamentosRequestDTO departamentos)
        {
            try
            {

                var departamento = db.Departamentos.Find(departamentos.Dep_Codigo);

                departamento.Dep_Nombre = departamentos.Dep_Nombre;
                departamento.Dep_Descripcion = departamentos.Dep_Descripcion;
                departamento.Dep_Jefe = departamentos.Dep_Jefe;

                db.Entry(departamento).State = EntityState.Modified;
                db.SaveChanges();
                return Ok(departamento);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }

        [HttpPost("registrodepartamentos")]
        public async ValueTask<ActionResult<DepartamentosResponseDTO>> Crear([FromBody] DepartamentosRequestDTO departamentos)
        {
            try
            {
                var departamento = new Departamentos
                {
                    //Usu_Codigo = id,
                    Dep_Nombre = departamentos.Dep_Nombre,
                    Dep_Descripcion = departamentos.Dep_Descripcion,
                    Dep_Jefe = departamentos.Dep_Jefe
                };

                await db.Departamentos.AddAsync(departamento);
                db.SaveChanges();
                return Ok(departamento);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }

        [HttpPut("eliminar")]
        public async ValueTask<ActionResult<DepartamentosResponseDTO>> Eliminar([FromBody] DepartamentosRequestDTO departamentos)
        {
            try
            {

                var departamento = db.Departamentos.Find(departamentos.Dep_Codigo);
                if (departamento != null)
                {
                    db.Departamentos.Remove(departamento);
                    db.SaveChanges();
                }
                return Ok(departamento);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }
    }
}