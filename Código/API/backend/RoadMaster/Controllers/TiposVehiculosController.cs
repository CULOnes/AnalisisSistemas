using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RoadMaster.DTOs.Request;
using RoadMaster.DTOs.Responses;
using RoadMaster.Repositories;
using RoadMaster.Repositories.Entities;

namespace RoadMaster.Controllers
{
    [Route("api/TiposVehiculos")]
    [ApiController]
    public class TiposVehiculosController : ControllerBase
    {
        private readonly AppDBContext db;
        private readonly IConfiguration configuration;

        public TiposVehiculosController(AppDBContext context, IConfiguration configuration)
        {
            db = context;
            configuration = configuration;
        }

        [HttpGet("tiposvehiculos")]
        public async ValueTask<ActionResult<TiposVehiculosResponseDTO>> Get()
        {
            try
            {
                var tiposvehiculos = db.TiposVehiculos.ToArray();
                return Ok(tiposvehiculos);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPut("actualizar")]
        public async ValueTask<ActionResult<TiposVehiculosResponseDTO>> Actualizar(TiposVehiculosRequestDTO tiposvehiculos)
        {
            try
            {

                var tipovehiculo = db.TiposVehiculos.Find(tiposvehiculos.TiV_Codigo);

                tipovehiculo.TiV_Nombre = tiposvehiculos.TiV_Nombre;
                tipovehiculo.TiV_Capacidad = tiposvehiculos.TiV_Capacidad;
                tipovehiculo.TiV_Tonelaje = tiposvehiculos.TiV_Tonelaje;
                tipovehiculo.TiV_Descripcion = tiposvehiculos.TiV_Descripcion;

                db.Entry(tipovehiculo).State = EntityState.Modified;
                db.SaveChanges();
                return Ok(tipovehiculo);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("registrotiposvehiculos")]
        public async ValueTask<ActionResult<TiposVehiculosResponseDTO>> Crear([FromBody] TiposVehiculosRequestDTO tiposvehiculos)
        {
            try
            {

                //var query = db.TiposVehiculos.ToArray();

                //var id = query.Count() + 1;

                var tipovehiculo = new TiposVehiculos
                {
                    //TiV_Codigo = id,
                    TiV_Nombre = tiposvehiculos.TiV_Nombre,
                    TiV_Capacidad = tiposvehiculos.TiV_Capacidad,
                    TiV_Tonelaje = tiposvehiculos.TiV_Tonelaje,
                    TiV_Descripcion = tiposvehiculos.TiV_Descripcion,
                };

                await db.TiposVehiculos.AddAsync(tipovehiculo);
                db.SaveChanges();
                return Ok(tipovehiculo);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("eliminar")]
        public async ValueTask<ActionResult<TiposVehiculosResponseDTO>> Eliminar([FromBody] TiposVehiculosRequestDTO tiposvehiculos)
        {
            try
            {
                var tipovehiculo = db.TiposVehiculos.Find(tiposvehiculos.TiV_Codigo);
                if (tipovehiculo != null)
                {
                    db.TiposVehiculos.Remove(tipovehiculo);
                    db.SaveChanges();
                }
                return Ok(tipovehiculo);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
