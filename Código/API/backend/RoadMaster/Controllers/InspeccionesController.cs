using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RoadMaster.DTOs.Request;
using RoadMaster.DTOs.Responses;
using RoadMaster.Repositories;
using RoadMaster.Repositories.Entities;

namespace RoadMaster.Controllers
{
    [Route("api/Inspecciones")]
    [ApiController]
    public class InspeccionesController : ControllerBase
    {
        private readonly AppDBContext db;
        private readonly IConfiguration configuration;

        public InspeccionesController(AppDBContext context, IConfiguration configuration)
        {
            db = context;
            configuration = configuration;
        }

        [HttpGet("inspecciones")]
        public async ValueTask<ActionResult<Inspecciones>> Get()
        {
            try
            {
                var inspecciones = db.Inspecciones.ToArray();
                return Ok(inspecciones);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Reporte de Vehiculos
        [HttpPost("reporteinspecciones")]
        public async ValueTask<ActionResult<InspeccionesResponseDTO>> ReporteInspecciones(ReporteIns inspecciones)
        {
            try
            {
                var busqueda = db.Inspecciones.Where(x => x.Ins_Fecha >= inspecciones.fechainicio || x.Ins_Fecha <= inspecciones.fechafin).ToArray();

                return Ok(busqueda);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("actualizar")]
        public async ValueTask<ActionResult<InspeccionesResponseDTO>> Actualizar(InspeccionesRequestDTO inspecciones)
        {
            try
            {

                var inspeccion = db.Inspecciones.Find(inspecciones.Ins_Codigo);

                inspeccion.Usu_Codigo = inspecciones.Usu_Codigo;
                inspeccion.Veh_Codigo = inspecciones.Veh_Codigo;
                inspeccion.Ins_KilometrajeActual = inspecciones.Ins_KilometrajeActual;
                inspeccion.Ins_Aprobacion = inspecciones.Ins_Aprobacion;
                inspeccion.Ins_Estado = inspecciones.Ins_Estado;
                //inspeccion.Ins_Fecha = inspecciones.Ins_Fecha;
                inspeccion.Ins_Descripcion = inspecciones.Ins_Descripcion;

                db.Entry(inspeccion).State = EntityState.Modified;
                db.SaveChanges();
                return Ok(inspeccion);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("registroinspecciones")]
        public async ValueTask<ActionResult<InspeccionesResponseDTO>> Crear([FromBody] InspeccionesRequestDTO inspecciones)
        {
            try
            {

                //var query = db.Inspecciones.ToArray();

                //var id = query.Count() + 1;

                //var date = DateTime.Now;

                var inspeccion = new Inspecciones
                {
                    //Ins_Codigo = id,
                    Usu_Codigo = inspecciones.Usu_Codigo,
                    Veh_Codigo = inspecciones.Veh_Codigo,
                    Ins_KilometrajeActual = inspecciones.Ins_KilometrajeActual,
                    Ins_Aprobacion = inspecciones.Ins_Aprobacion,
                    Ins_Estado = inspecciones.Ins_Estado,
                    Ins_Fecha = inspecciones.Ins_Fecha,
                    Ins_Descripcion = inspecciones.Ins_Descripcion
                };

                await db.Inspecciones.AddAsync(inspeccion);
                db.SaveChanges();
                return Ok(inspeccion);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("eliminar")]
        public async ValueTask<ActionResult<InspeccionesResponseDTO>> Eliminar([FromBody] InspeccionesRequestDTO inspecciones)
        {
            try
            {

                var inspeccion = db.Inspecciones.Find(inspecciones.Ins_Codigo);
                if (inspeccion != null)
                {
                    db.Inspecciones.Remove(inspeccion);
                    db.SaveChanges();
                }
                return Ok(inspeccion);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }

    public class ReporteIns
    {
        public DateTime fechainicio { get; set; }
        public DateTime fechafin { get; set; }
    }
}