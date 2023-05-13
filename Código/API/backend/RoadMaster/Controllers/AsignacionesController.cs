using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RoadMaster.DTOs.Request;
using RoadMaster.DTOs.Responses;
using RoadMaster.Repositories;
using RoadMaster.Repositories.Entities;

namespace RoadMaster.Controllers
{
    [Route("api/Asignaciones")]
    [ApiController]
    public class AsignacionesController : ControllerBase
    {
        private readonly AppDBContext db;
        private readonly IConfiguration configuration;

        public AsignacionesController(AppDBContext context, IConfiguration configuration)
        {
            db = context;
            configuration = configuration;
        }

        [HttpGet("asignaciones")]
        public async ValueTask<ActionResult<AsignacionesResponseDTO>> Get()
        {
            try
            {
                var asignaciones = db.Asignaciones.ToArray();
                return Ok(asignaciones);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Reporte de Vehiculos
        [HttpPost("reporteasignacionesentradas")]
        public async ValueTask<ActionResult<AsignacionesResponseDTO>> ReporteAsignaconesEntradas(ReporteAsig asignaciones)
        {
            try
            {
                var busqueda = db.Asignaciones.Where(x => x.asi_fechaentrada >= asignaciones.fechainicio || x.asi_fechaentrada <= asignaciones.fechafin).ToArray();

                return Ok(busqueda);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        //Reporte de Vehiculos
        [HttpPost("reporteasignacionessalidas")]
        public async ValueTask<ActionResult<AsignacionesResponseDTO>> ReporteAsignaconesSalidas(ReporteAsig asignaciones)
        {
            try
            {
                var busqueda = db.Asignaciones.Where(x => x.asi_fechasalida >= asignaciones.fechainicio || x.asi_fechasalida <= asignaciones.fechafin).ToArray();

                return Ok(busqueda);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("actualizar")]
        public async ValueTask<ActionResult<AsignacionesResponseDTO>> Actualizar(AsignacionesRequestDTO asignaciones)
        {
            try
            {

                var asignacion = db.Asignaciones.Find(asignaciones.asi_codigo);

                asignacion.usu_codigo = asignaciones.usu_codigo;
                asignacion.ins_codigo = asignaciones.ins_codigo;
                asignacion.veh_codigo = asignaciones.veh_codigo;
                asignacion.emp_codigo = asignaciones.emp_codigo;
                asignacion.cli_codigo = asignaciones.cli_codigo;
                asignacion.seg_codigo = asignaciones.seg_codigo;
                asignacion.asi_kilometraje = asignaciones.asi_kilometraje;
                asignacion.asi_fechasalida = asignaciones.asi_fechasalida;
                asignacion.asi_fechaentrada = asignaciones.asi_fechaentrada;
                asignacion.asi_observaciones = asignaciones.asi_observaciones;

                db.Entry(asignacion).State = EntityState.Modified;
                db.SaveChanges();
                return Ok(asignacion);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("registroasignaciones")]
        public async ValueTask<ActionResult<AsignacionesResponseDTO>> Crear([FromBody] AsignacionesRequestDTO asignaciones)
        {
            try
            {

                var asignacion = new Asignaciones
                {
                    asi_codigo = asignaciones.asi_codigo,
                    usu_codigo = asignaciones.usu_codigo,
                    ins_codigo = asignaciones.ins_codigo,
                    veh_codigo = asignaciones.veh_codigo,
                    emp_codigo = asignaciones.emp_codigo,
                    cli_codigo = asignaciones.cli_codigo,
                    seg_codigo = asignaciones.seg_codigo,
                    asi_kilometraje = asignaciones.asi_kilometraje,
                    asi_fechasalida = asignaciones.asi_fechasalida,
                    asi_fechaentrada = asignaciones.asi_fechaentrada,
                    asi_observaciones = asignaciones.asi_observaciones
                };

                await db.Asignaciones.AddAsync(asignacion);
                db.SaveChanges();
                return Ok(asignacion);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("eliminar")]
        public async ValueTask<ActionResult<AsignacionesResponseDTO>> Eliminar([FromBody] AsignacionesRequestDTO asignaciones)
        {
            try
            {

                var asignacion = db.Asignaciones.Find(asignaciones.asi_codigo);
                if (asignacion != null)
                {
                    db.Asignaciones.Remove(asignacion);
                    db.SaveChanges();
                }
                return Ok(asignacion);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }

    public class ReporteAsig
    {
        public DateTime fechainicio { get; set; }
        public DateTime fechafin { get; set; }
    }
}