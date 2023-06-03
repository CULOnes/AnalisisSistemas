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
                return BadRequest("Error interno, contacte administrador");
            }
        }

        //Reporte de Vehiculos
        [HttpPost("reportemantenimientos")]
        public async ValueTask<ActionResult<MantenimientosResponseDTO>> ReporteMantenimientos(ReporteMant mantenimientos)
        {
            try
            {
                var busqueda = db.Mantenimientos.Where(x => x.man_Fecha >= mantenimientos.fechainicio || x.man_Fecha <= mantenimientos.fechafin).ToArray();

                return Ok(busqueda);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }

        [HttpPut("actualizar")]
        public async ValueTask<ActionResult<MantenimientosResponseDTO>> Actualizar(MantenimientosRequestDTO mantenimientos)
        {
            try
            {

                if (mantenimientos.man_Kilometraje < 0)
                {
                    return BadRequest("El kilometraje no puede ser menor a 0");
                }

                if (mantenimientos.man_Fecha > DateTime.Now)
                {
                    return BadRequest("La fecha no puede ser mayor a hoy");
                }

                var mantenimiento = db.Mantenimientos.Find(mantenimientos.man_Codigo);

                mantenimiento.tiR_Codigo = mantenimientos.tiR_Codigo;
                mantenimiento.ins_Codigo = mantenimientos.ins_Codigo;
                mantenimiento.man_Fecha = mantenimientos.man_Fecha;
                mantenimiento.man_Kilometraje = mantenimientos.man_Kilometraje;
                mantenimiento.man_Estado = mantenimientos.man_Estado;

                db.Entry(mantenimiento).State = EntityState.Modified;
                db.SaveChanges();
                return Ok(mantenimiento);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }

        [HttpPost("registromantenimientos")]
        public async ValueTask<ActionResult<MantenimientosResponseDTO>> Crear([FromBody] MantenimientosRequestDTO mantenimientos)
        {
            try
            {

                

                if (mantenimientos.man_Kilometraje < 0)
                {
                    return BadRequest("El kilometraje no puede ser menor a 0");
                }

                if(mantenimientos.man_Fecha > DateTime.Now)
                {
                    return BadRequest("La fecha no puede ser mayor a hoy");
                }

                var mantenimiento = new Mantenimientos
                {
                    tiR_Codigo = mantenimientos.tiR_Codigo,
                    ins_Codigo = mantenimientos.ins_Codigo,
                    man_Fecha = mantenimientos.man_Fecha,
                    man_Kilometraje = mantenimientos.man_Kilometraje,
                    man_Estado = mantenimientos.man_Estado
                };

                await db.Mantenimientos.AddAsync(mantenimiento);
                db.SaveChanges();
                return Ok(mantenimiento);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }

        [HttpPut("eliminar")]
        public async ValueTask<ActionResult<MantenimientosResponseDTO>> Eliminar([FromBody] MantenimientosRequestDTO mantenimientos)
        {
            try
            {

                var mantenimiento = db.Mantenimientos.Find(mantenimientos.man_Codigo);
                if (mantenimiento != null)
                {
                    db.Mantenimientos.Remove(mantenimiento);
                    db.SaveChanges();
                }
                return Ok(mantenimiento);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }
    }

    public class ReporteMant
    {
        public DateTime fechainicio { get; set; }
        public DateTime fechafin { get; set; }
    }
}