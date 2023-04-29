using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RoadMaster.DTOs.Request;
using RoadMaster.DTOs.Responses;
using RoadMaster.Repositories;
using RoadMaster.Repositories.Entities;

namespace RoadMaster.Controllers
{
    [Route("api/TiposReparaciones")]
    [ApiController]
    public class TiposReparacionesController : ControllerBase
    {
        private readonly AppDBContext db;
        private readonly IConfiguration configuration;

        public TiposReparacionesController(AppDBContext context, IConfiguration configuration)
        {
            db = context;
            configuration = configuration;
        }

        [HttpGet("tiposreparaciones")]
        public async ValueTask<ActionResult<TiposReparacionesResponseDTO>> Get()
        {
            try
            {
                var tiposreparaciones = db.TiposReparaciones.ToArray();
                return Ok(tiposreparaciones);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPut("actualizar")]
        public async ValueTask<ActionResult<TiposReparacionesResponseDTO>> Actualizar(TiposReparacionesRequestDTO tiposreparaciones)
        {
            try
            {

                var tiporeparacion = db.TiposReparaciones.Find(tiposreparaciones.TiR_Codigo);

                tiporeparacion.TiR_Nombre = tiposreparaciones.TiR_Nombre;
                tiporeparacion.TiR_Costo = tiposreparaciones.TiR_Costo;
                tiporeparacion.TiR_Tiempo = tiposreparaciones.TiR_Tiempo;
                tiporeparacion.TiR_Piezas = tiposreparaciones.TiR_Piezas;
                tiporeparacion.TiR_Descripcion = tiposreparaciones.TiR_Descripcion;

                db.Entry(tiporeparacion).State = EntityState.Modified;
                db.SaveChanges();
                return Ok(tiporeparacion);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("registrotiporeparaciones")]
        public async ValueTask<ActionResult<TiposReparacionesResponseDTO>> Crear([FromBody] TiposReparacionesRequestDTO tiposreparaciones)
        {
            try
            {

                var query = db.TiposReparaciones.ToArray();

                var id = query.Count() + 1;

                var tiporeparacion = new TiposReparaciones
                {
                    TiR_Codigo = id,
                    TiR_Nombre = tiposreparaciones.TiR_Nombre,
                    TiR_Costo = tiposreparaciones.TiR_Costo,
                    TiR_Tiempo = tiposreparaciones.TiR_Tiempo,
                    TiR_Piezas = tiposreparaciones.TiR_Piezas,
                    TiR_Descripcion = tiposreparaciones.TiR_Descripcion
                };

                await db.TiposReparaciones.AddAsync(tiporeparacion);
                db.SaveChanges();
                return Ok(tiporeparacion);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("eliminar")]
        public async ValueTask<ActionResult<TiposReparacionesResponseDTO>> Eliminar([FromBody] TiposReparacionesRequestDTO tiposreparaciones)
        {
            try
            {

                var tiporeparacion = db.TiposReparaciones.Find(tiposreparaciones.TiR_Codigo);
                if (tiporeparacion != null)
                {
                    db.TiposReparaciones.Remove(tiporeparacion);
                    db.SaveChanges();
                }
                return Ok(tiporeparacion);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}