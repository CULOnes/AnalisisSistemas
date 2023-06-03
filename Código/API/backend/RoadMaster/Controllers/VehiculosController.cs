using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RoadMaster.DTOs.Request;
using RoadMaster.DTOs.Responses;
using RoadMaster.Repositories;
using RoadMaster.Repositories.Entities;

namespace RoadMaster.Controllers
{
    [Route("api/Vehiculos")]
    [ApiController]
    public class VehiculosController : ControllerBase
    {
        private readonly AppDBContext db;
        private readonly IConfiguration configuration;

        public VehiculosController(AppDBContext context, IConfiguration configuration)
        {
            db = context;
            configuration = configuration;
        }

        [HttpGet("vehiculos")]
        public async ValueTask<ActionResult<VehiculosResponseDTO>> Get()
        {
            try
            {
                var vehiculos = db.Vehiculos.ToArray();
                return Ok(vehiculos);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }

        //Reporte de Vehiculos
        [HttpPost("reportevehiculos")]
        public async ValueTask<ActionResult<VehiculosResponseDTO>> ReporteVehiculos(ReporteV vehiculos)
        {
            try
            {
                int año = 0;
                Vehiculos[]? busqueda = null;

                switch (vehiculos.tipobusqueda)
                {
                    case 1:
                        busqueda = db.Vehiculos.Where(x => x.Veh_Marca == vehiculos.valor).ToArray();
                        break;
                    case 2:
                        busqueda = db.Vehiculos.Where(x => x.Veh_Modelo == vehiculos.valor).ToArray();
                        break;
                    case 3:
                        año = Int32.Parse(vehiculos.valor);
                        busqueda = db.Vehiculos.Where(x => x.Veh_Año == año).ToArray();
                        break;
                    case 4:
                        busqueda = db.Vehiculos.Where(x => x.Veh_Color == vehiculos.valor).ToArray();
                        break;
                    case 5:
                        busqueda = db.Vehiculos.Where(x => x.Veh_Transmision == vehiculos.valor).ToArray();
                        break;
                    default:
                        break;
                }

                return Ok(busqueda);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("actualizar")]
        public async ValueTask<ActionResult<VehiculosResponseDTO>> Actualizar(VehiculosRequestDTO vehiculos)
        {
            try
            {

                int añofuturo = DateTime.Now.Year + 1;

                if (vehiculos.Veh_Año < 1975 || vehiculos.Veh_Año > añofuturo)
                {
                    return BadRequest("Debe ingresar un año entre 1975 y " + añofuturo);
                }

                if (vehiculos.Veh_KilometrajeInicial < 0)
                {
                    return BadRequest("Inserte un Kilometraje Valido");
                }

                var vehiculo = db.Vehiculos.Find(vehiculos.Veh_Codigo);

                vehiculo.TiV_Codigo = vehiculos.TiV_Codigo;
                vehiculo.Com_Codigo = vehiculos.Com_Codigo;
                vehiculo.Veh_Marca = vehiculos.Veh_Marca;
                vehiculo.Veh_Placa = vehiculos.Veh_Placa;
                vehiculo.Veh_Modelo = vehiculos.Veh_Modelo;
                vehiculo.Veh_Año = vehiculos.Veh_Año;
                vehiculo.Veh_KilometrajeInicial = vehiculos.Veh_KilometrajeInicial;
                vehiculo.Veh_Color = vehiculos.Veh_Color;
                vehiculo.Veh_Transmision = vehiculos.Veh_Transmision;

                db.Entry(vehiculo).State = EntityState.Modified;
                db.SaveChanges();
                return Ok(vehiculo);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }

        [HttpPost("registrovehiculos")]
        public async ValueTask<ActionResult<VehiculosResponseDTO>> Crear([FromBody] VehiculosRequestDTO vehiculos)
        {
            try
            {

                int añofuturo = DateTime.Now.Year + 1;

                if (vehiculos.Veh_Año < 1975 || vehiculos.Veh_Año > añofuturo)
                {
                    return BadRequest("Debe ingresar un año entre 1975 y " + añofuturo);
                }

                if (vehiculos.Veh_KilometrajeInicial < 0)
                {
                    return BadRequest("Inserte un Kilometraje Valido");
                }

                var vehiculo = new Vehiculos
                {
                    TiV_Codigo = vehiculos.TiV_Codigo,
                    Com_Codigo = vehiculos.Com_Codigo,
                    Veh_Marca = vehiculos.Veh_Marca,
                    Veh_Placa = vehiculos.Veh_Placa,
                    Veh_Modelo = vehiculos.Veh_Modelo,
                    Veh_Año = vehiculos.Veh_Año,
                    Veh_KilometrajeInicial = vehiculos.Veh_KilometrajeInicial,
                    Veh_Color = vehiculos.Veh_Color,
                    Veh_Transmision = vehiculos.Veh_Transmision
                };

                await db.Vehiculos.AddAsync(vehiculo);
                db.SaveChanges();
                return Ok(vehiculo);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }

        [HttpPut("eliminar")]
        public async ValueTask<ActionResult<VehiculosResponseDTO>> Eliminar([FromBody] VehiculosRequestDTO vehiculos)
        {
            try
            {

                var vehiculo = db.Vehiculos.Find(vehiculos.Veh_Codigo);
                if (vehiculo != null)
                {
                    db.Vehiculos.Remove(vehiculo);
                    db.SaveChanges();
                }
                return Ok(vehiculo);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }
    }

    public class ReporteV
    {
        public int tipobusqueda { get; set; }
        public string valor { get; set; }
    }
}