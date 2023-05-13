using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RoadMaster.DTOs.Request;
using RoadMaster.DTOs.Responses;
using RoadMaster.Repositories;
using RoadMaster.Repositories.Entities;

namespace RoadMaster.Controllers
{
    [Route("api/Mantenimientos")]
    [ApiController]
    public class MantenimientosController : ControllerBase
    {
        private readonly AppDBContext db;
        private readonly IConfiguration configuration;

        public MantenimientosController(AppDBContext context, IConfiguration configuration)
        {
            db = context;
            configuration = configuration;
        }

        [HttpGet("mantenimientos")]
        public async ValueTask<ActionResult<MantenimientosResponseDTO>> Get()
        {
            try
            {
                var mantenimientos = db.Mantenimientos.ToArray();
                return Ok(mantenimientos);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Reporte de Vehiculos
        [HttpPost("reportemantenimientos")]
        public async ValueTask<ActionResult<MantenimientosResponseDTO>> ReporteMantenimientos(ReporteMant mantenimientos)
        {
            try
            {
                var busqueda = db.Mantenimientos.Where(x => x.man_fecha >= mantenimientos.fechainicio || x.man_fecha <= mantenimientos.fechafin).ToArray();

                return Ok(busqueda);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("actualizar")]
        public async ValueTask<ActionResult<MantenimientosResponseDTO>> Actualizar(MantenimientosRequestDTO mantenimientos)
        {
            try
            {

                var mantenimiento = db.Mantenimientos.Find(mantenimientos.man_codigo);

                mantenimiento.tir_codigo = mantenimientos.tir_codigo;
                mantenimiento.ins_codigo = mantenimientos.ins_codigo;
                mantenimiento.man_fecha = mantenimientos.man_fecha;
                mantenimiento.man_kilometraje = mantenimientos.man_kilometraje;
                mantenimiento.man_estado = mantenimientos.man_estado;

                db.Entry(mantenimiento).State = EntityState.Modified;
                db.SaveChanges();
                return Ok(mantenimiento);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("registromantenimientos")]
        public async ValueTask<ActionResult<MantenimientosResponseDTO>> Crear([FromBody] MantenimientosRequestDTO mantenimientos)
        {
            try
            {

                var mantenimiento = new Mantenimientos
                {
                    tir_codigo = mantenimientos.tir_codigo,
                    ins_codigo = mantenimientos.ins_codigo,
                    man_fecha = mantenimientos.man_fecha,
                    man_kilometraje = mantenimientos.man_kilometraje,
                    man_estado = mantenimientos.man_estado
                };

                await db.Mantenimientos.AddAsync(mantenimiento);
                db.SaveChanges();
                return Ok(mantenimiento);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("eliminar")]
        public async ValueTask<ActionResult<MantenimientosResponseDTO>> Eliminar([FromBody] MantenimientosRequestDTO mantenimientos)
        {
            try
            {

                var mantenimiento = db.Mantenimientos.Find(mantenimientos.man_codigo);
                if (mantenimiento != null)
                {
                    db.Mantenimientos.Remove(mantenimiento);
                    db.SaveChanges();
                }
                return Ok(mantenimiento);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }

    public class ReporteMant
    {
        public DateTime fechainicio { get; set; }
        public DateTime fechafin { get; set; }
    }
}