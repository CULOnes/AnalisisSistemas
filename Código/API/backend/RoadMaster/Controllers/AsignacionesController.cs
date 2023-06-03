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
                var busqueda = db.Asignaciones.Where(x => x.asi_Fechaentrada >= asignaciones.fechainicio || x.asi_Fechaentrada <= asignaciones.fechafin).ToArray();

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
                var busqueda = db.Asignaciones.Where(x => x.asi_Fechaentrada >= asignaciones.fechainicio || x.asi_Fechaentrada <= asignaciones.fechafin).ToArray();

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

                var asignacion = db.Asignaciones.Find(asignaciones.asi_Codigo);

                asignacion.usu_Codigo = asignaciones.usu_Codigo;
                asignacion.ins_Codigo = asignaciones.ins_Codigo;
                asignacion.veh_Codigo = asignaciones.veh_Codigo;
                asignacion.emp_Codigo = asignaciones.emp_Codigo;
                asignacion.cli_Codigo = asignaciones.cli_Codigo;
                asignacion.seg_Codigo = asignaciones.seg_Codigo;
                asignacion.asi_Kilometraje = asignaciones.asi_Kilometraje;
                asignacion.asi_Fechasalida = asignaciones.asi_Fechasalida;
                asignacion.asi_Fechaentrada = asignaciones.asi_Fechaentrada;
                asignacion.asi_Observaciones = asignaciones.asi_Observaciones;

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
                    asi_Codigo = asignaciones.asi_Codigo,
                    usu_Codigo = asignaciones.usu_Codigo,
                    ins_Codigo = asignaciones.ins_Codigo,
                    veh_Codigo = asignaciones.veh_Codigo,
                    emp_Codigo = asignaciones.emp_Codigo,
                    cli_Codigo = asignaciones.cli_Codigo,
                    seg_Codigo = asignaciones.seg_Codigo,
                    asi_Kilometraje = asignaciones.asi_Kilometraje,
                    asi_Fechasalida = asignaciones.asi_Fechasalida,
                    asi_Fechaentrada = asignaciones.asi_Fechaentrada,
                    asi_Observaciones = asignaciones.asi_Observaciones
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

                var asignacion = db.Asignaciones.Find(asignaciones.asi_Codigo);
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