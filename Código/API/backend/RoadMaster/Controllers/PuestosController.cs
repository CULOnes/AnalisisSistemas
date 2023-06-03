using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RoadMaster.DTOs.Request;
using RoadMaster.DTOs.Responses;
using RoadMaster.Repositories;
using RoadMaster.Repositories.Entities;

namespace RoadMaster.Controllers
{
    [Route("api/Puestos")]
    [ApiController]
    public class PuestosController : ControllerBase
    {
        private readonly AppDBContext db;
        private readonly IConfiguration configuration;

        public PuestosController(AppDBContext context, IConfiguration configuration)
        {
            db = context;
            configuration = configuration;
        }

        [HttpGet("puestos")]
        public async ValueTask<ActionResult<PuestosResponseDTO>> Get()
        {
            try
            {
                var puestos = db.Puestos.ToArray();
                return Ok(puestos);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }

        ////Reporte de Vehiculos
        //[HttpPost("reporteclientes")]
        //public async ValueTask<ActionResult<ClientesResponseDTO>> ReporteVehiculos(ReporteCli clientes)
        //{
        //    try
        //    {
        //        Clientes[]? busqueda = null;

        //        switch (clientes.tipobusqueda)
        //        {
        //            case 1:
        //                busqueda = db.Clientes.Where(x => x.Cli_Nombre == clientes.valor).ToArray();
        //                break;
        //            case 2:
        //                busqueda = db.Clientes.Where(x => x.Cli_Apellido == clientes.valor).ToArray();
        //                break;
        //            default:
        //                break;
        //        }

        //        return Ok(busqueda);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest("Error interno, contacte administrador");
        //    }
        //}

        [HttpPut("actualizar")]
        public async ValueTask<ActionResult<PuestosResponseDTO>> Actualizar(PuestosResponseDTO puestos)
        {
            try
            {

                var puesto = db.Puestos.Find(puestos.pue_Codigo);

                puesto.pue_Nombre = puestos.pue_Nombre;
                puesto.pue_Descripcion = puestos.pue_Descripcion;

                db.Entry(puesto).State = EntityState.Modified;
                db.SaveChanges();
                return Ok(puesto);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }

        [HttpPost("registropuestos")]
        public async ValueTask<ActionResult<PuestosResponseDTO>> Crear([FromBody] PuestosRequestDTO puestos)
        {
            try
            {

                var puesto = new Puestos
                {
                    //Cli_Codigo = id,
                    pue_Nombre = puestos.pue_Nombre,
                    pue_Descripcion = puestos.pue_Descripcion,
                };

                await db.Puestos.AddAsync(puesto);
                db.SaveChanges();
                return Ok(puesto);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }

        [HttpPut("eliminar")]
        public async ValueTask<ActionResult<PuestosResponseDTO>> Eliminar([FromBody] PuestosRequestDTO puestos)
        {
            try
            {

                var puesto = db.Puestos.Find(puestos.pue_Codigo);
                if (puesto != null)
                {
                    db.Puestos.Remove(puesto);
                    db.SaveChanges();
                }
                return Ok(puesto);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }
    }

    //public class ReporteCli
    //{
    //    public int tipobusqueda { get; set; }
    //    public string valor { get; set; }
    //}
}
