using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RoadMaster.DTOs.Request;
using RoadMaster.DTOs.Responses;
using RoadMaster.Repositories;
using RoadMaster.Repositories.Entities;

namespace RoadMaster.Controllers
{
    [Route("api/TiposSeguros")]
    [ApiController]
    public class TiposSegurosController : ControllerBase
    {
        private readonly AppDBContext db;
        private readonly IConfiguration configuration;

        public TiposSegurosController(AppDBContext context, IConfiguration configuration)
        {
            db = context;
            configuration = configuration;
        }

        [HttpGet("tiposseguros")]
        public async ValueTask<ActionResult<TiposSegurosResponseDTO>> Get()
        {
            try
            {
                var tiposseguros = db.TiposSeguros.ToArray();
                return Ok(tiposseguros);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }


        [HttpPut("actualizar")]
        public async ValueTask<ActionResult<TiposSegurosResponseDTO>> Actualizar(TiposSegurosRequestDTO tiposseguros)
        {
            try
            {

                var tiposeguro = db.TiposSeguros.Find(tiposseguros.TiS_Codigo);

                tiposeguro.TiS_Nombre = tiposseguros.TiS_Nombre;
                tiposeguro.TiS_Descripcion = tiposseguros.TiS_Descripcion;

                db.Entry(tiposeguro).State = EntityState.Modified;
                db.SaveChanges();
                return Ok(tiposeguro);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }

        [HttpPost("registrotiposeguro")]
        public async ValueTask<ActionResult<TiposSegurosResponseDTO>> Crear([FromBody] TiposSegurosRequestDTO tiposseguros)
        {
            try
            {

                //var query = db.TiposSeguros.ToArray();

                //var id = query.Count() + 1;

                var tiposeguro = new TiposSeguros
                {
                    //TiS_Codigo = id,
                    TiS_Nombre = tiposseguros.TiS_Nombre,
                    TiS_Descripcion = tiposseguros.TiS_Descripcion
                };

                await db.TiposSeguros.AddAsync(tiposeguro);
                db.SaveChanges();
                return Ok(tiposeguro);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }

        [HttpPut("eliminar")]
        public async ValueTask<ActionResult<TiposSegurosResponseDTO>> Eliminar([FromBody] TiposSegurosRequestDTO tiposseguros)
        {
            try
            {

                var tiposeguro = db.TiposSeguros.Find(tiposseguros.TiS_Codigo);
                if (tiposeguro != null)
                {
                    db.TiposSeguros.Remove(tiposeguro);
                    db.SaveChanges();
                }
                return Ok(tiposeguro);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }
    }
}