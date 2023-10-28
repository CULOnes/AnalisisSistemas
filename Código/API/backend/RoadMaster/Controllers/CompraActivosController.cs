using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using RoadMaster.DTOs.Request;
using RoadMaster.DTOs.Responses;
using RoadMaster.Repositories;
using RoadMaster.Repositories.Entities;
using RoadMaster.Utils;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
//using RoadMaster.Utils;

namespace RoadMaster.Controllers
{
    [Route("api/CompraActivos")]
    [ApiController]
    public class CompraActivosController : ControllerBase
    {
        private readonly AppDBContext db;
        private readonly IConfiguration Configuration;
        private readonly Login log = new Login();

        public CompraActivosController(AppDBContext context, IConfiguration configuration)
        {
            db = context;
            Configuration = configuration;
        }

        [HttpGet("compraactivos")]
        public async ValueTask<ActionResult<ActivosResponseDTO>> Get()
        {
            try
            {
                var usuarios = db.Usuarios.ToArray();
                return Ok(usuarios);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }

        [HttpPost("validarFactura")]
        public async ValueTask<ActionResult<ActivosResponseDTO>> validarFactura(validarFactura validafactura)
        {
            try
            {
                var infoguardar = new Activos
                {
                    Act_FechaIgreso = validafactura.Act_FechaIgreso,
                };

                await db.Activos.AddAsync(infoguardar);
                db.SaveChanges();
                return Ok(infoguardar);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost("validarActivo")]
        public async ValueTask<ActionResult<ActivosResponseDTO>> validarActivo(validarActivo info)
        {
            try
            {
                var infoguardar = new Activos
                {
                    Act_Nombre = info.Act_Nombre,
                    Mar_Codigo = info.Mar_Codigo,
                    Est_Codigo = info.Est_Codigo,
                    Act_ValorInicial = info.Act_ValorInicial
                };

                await db.Activos.AddAsync(infoguardar);
                db.SaveChanges();
                return Ok(infoguardar);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost("consultaractivo")]
        public async ValueTask<ActionResult<ActivosResponseDTO>> consultarActivo(modeloconsulta consulta)
        {
            try
            {
                Activos[]? busqueda = null;
                switch (consulta.tipo_busqueda)
                {
                    case 1:
                        busqueda = db.Activos.Where(x => x.UbF_Codigo == consulta.criterio_busqueda && x.Act_FechaIgreso >= consulta.fecha_inicio && x.Act_FechaIgreso <= consulta.fecha_fin).ToArray();
                        break;
                    case 2:
                        busqueda = db.Activos.Where(x => x.Cus_Codigo == consulta.criterio_busqueda && x.Act_FechaIgreso >= consulta.fecha_inicio && x.Act_FechaIgreso <= consulta.fecha_fin).ToArray();
                        break;
                    case 3:
                        busqueda = db.Activos.Where(x => x.Est_Codigo == consulta.criterio_busqueda && x.Act_FechaIgreso >= consulta.fecha_inicio && x.Act_FechaIgreso <= consulta.fecha_fin).ToArray();
                        break;
                    case 4:
                        busqueda = db.Activos.Where(x => x.Mar_Codigo == consulta.criterio_busqueda && x.Act_FechaIgreso >= consulta.fecha_inicio && x.Act_FechaIgreso <= consulta.fecha_fin).ToArray();
                        break;
                }
                return Ok(busqueda);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost("depreciaciones")]
        public async ValueTask<ActionResult<dynamic>> Depreciaciones(modelodepreciacion consulta)
        {
            try
            {
                Activos[]? busqueda = null;
                string clase = "";
                switch (consulta.clase)
                {
                    case 1:
                        clase = "Mobiliario y Equipo";
                        busqueda = db.Activos.Where(x => x.Act_Clase == clase).ToArray();
                        break;
                    case 2:
                        clase = "Vehiculos";
                        busqueda = db.Activos.Where(x => x.Act_Clase == clase).ToArray();
                        break;
                    case 3:
                        clase = "Equipo de Computo";
                        busqueda = db.Activos.Where(x => x.Act_Clase == clase).ToArray();
                        break;
                    case 4:
                        clase = "Herramientas";
                        busqueda = db.Activos.Where(x => x.Act_Clase == clase).ToArray();
                        break;
                    case 5:
                        clase = "Maquinaria";
                        busqueda = db.Activos.Where(x => x.Act_Clase == clase).ToArray();
                        break;
                    case 6:
                        clase = "Edificios";
                        busqueda = db.Activos.Where(x => x.Act_Clase == clase).ToArray();
                        break;
                    case 7:
                        clase = "Gastos de Organización";
                        busqueda = db.Activos.Where(x => x.Act_Clase == clase).ToArray();
                        break;
                    case 8:
                        clase = "Derecho de Llave";
                        busqueda = db.Activos.Where(x => x.Act_Clase == clase).ToArray();
                        break;
                    case 9:
                        clase = "Gastos de Instalacion";
                        busqueda = db.Activos.Where(x => x.Act_Clase == clase).ToArray();
                        break;
                    case 10:
                        clase = "Marcas y Patentes";
                        busqueda = db.Activos.Where(x => x.Act_Clase == clase).ToArray();
                        break;
                }

                List<dynamic> lista = new List<dynamic>();

                if (consulta.clase == 1 || consulta.clase == 2 || consulta.clase == 5)
                {
                    foreach (var item in busqueda)
                    {
                        double porcentaje = (double)item.Act_ValorInicial * 0.20;
                        double mes = porcentaje / 12;

                        DateTime fechaNormal = item.Act_FechaIgreso ?? DateTime.MinValue;
                        double tiempo = (consulta.hasta_fecha.Year - fechaNormal.Year) * 12 + consulta.hasta_fecha.Month - fechaNormal.Month;

                        double total = mes * tiempo;
                        double precio = (double)item.Act_ValorInicial - total;

                        var depreciacion = new respuestadepreciacion
                        {
                            clase = clase,
                            fecha = consulta.hasta_fecha,
                            depreciacion = total,
                            precioactual = precio
                        };

                        lista.Add(depreciacion);

                    }
                }

                if (consulta.clase == 3)
                {
                    foreach (var item in busqueda)
                    {
                        double porcentaje = (double)item.Act_ValorInicial * 0.3333;
                        double mes = porcentaje / 12;

                        DateTime fechaNormal = item.Act_FechaIgreso ?? DateTime.MinValue;
                        double tiempo = (consulta.hasta_fecha.Year - fechaNormal.Year) * 12 + consulta.hasta_fecha.Month - fechaNormal.Month;

                        double total = mes * tiempo;
                        double precio = (double)item.Act_ValorInicial - total;

                        var depreciacion = new respuestadepreciacion
                        {
                            clase = clase,
                            fecha = consulta.hasta_fecha,
                            depreciacion = total,
                            precioactual = precio
                        };

                        lista.Add(depreciacion);

                    }
                }

                if (consulta.clase == 4)
                {
                    foreach (var item in busqueda)
                    {
                        double porcentaje = (double)item.Act_ValorInicial * 0.25;
                        double mes = porcentaje / 12;

                        DateTime fechaNormal = item.Act_FechaIgreso ?? DateTime.MinValue;
                        double tiempo = (consulta.hasta_fecha.Year - fechaNormal.Year) * 12 + consulta.hasta_fecha.Month - fechaNormal.Month;

                        double total = mes * tiempo;
                        double precio = (double)item.Act_ValorInicial - total;

                        var depreciacion = new respuestadepreciacion
                        {
                            clase = clase,
                            fecha = consulta.hasta_fecha,
                            depreciacion = total,
                            precioactual = precio
                        };

                        lista.Add(depreciacion);

                    }
                }

                if (consulta.clase == 6)
                {
                    foreach (var item in busqueda)
                    {
                        double porcentaje = (double)item.Act_ValorInicial * 0.05;
                        double mes = porcentaje / 12;

                        DateTime fechaNormal = item.Act_FechaIgreso ?? DateTime.MinValue;
                        double tiempo = (consulta.hasta_fecha.Year - fechaNormal.Year) * 12 + consulta.hasta_fecha.Month - fechaNormal.Month;

                        double total = mes * tiempo;
                        double precio = (double)item.Act_ValorInicial - total;

                        var depreciacion = new respuestadepreciacion
                        {
                            clase = clase,
                            fecha = consulta.hasta_fecha,
                            depreciacion = total,
                            precioactual = precio
                        };

                        lista.Add(depreciacion);

                    }
                }

                if (consulta.clase == 7 || consulta.clase == 9 || consulta.clase == 10)
                {
                    foreach (var item in busqueda)
                    {
                        double años = (double)item.Act_ValorInicial / 5;
                        double meses = años / 12;

                        DateTime fechaNormal = item.Act_FechaIgreso ?? DateTime.MinValue;
                        double tiempo = (consulta.hasta_fecha.Year - fechaNormal.Year) * 12 + consulta.hasta_fecha.Month - fechaNormal.Month;

                        double total = meses * tiempo;
                        double precio = (double)item.Act_ValorInicial - total;

                        var depreciacion = new respuestadepreciacion
                        {
                            clase = clase,
                            fecha = consulta.hasta_fecha,
                            depreciacion = total,
                            precioactual = precio
                        };

                        lista.Add(depreciacion);

                    }
                }

                if (consulta.clase == 8)
                {
                    foreach (var item in busqueda)
                    {
                        double años = (double)item.Act_ValorInicial / 10;
                        double meses = años / 12;

                        DateTime fechaNormal = item.Act_FechaIgreso ?? DateTime.MinValue;
                        double tiempo = (consulta.hasta_fecha.Year - fechaNormal.Year) * 12 + consulta.hasta_fecha.Month - fechaNormal.Month;

                        double total = meses * tiempo;
                        double precio = (double)item.Act_ValorInicial - total;

                        var depreciacion = new respuestadepreciacion
                        {
                            clase = clase,
                            fecha = consulta.hasta_fecha,
                            depreciacion = total,
                            precioactual = precio
                        };

                        lista.Add(depreciacion);

                    }
                }

                return Ok(lista);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

    }

    public class modeloconsulta
    {
        public int tipo_busqueda { get; set; }
        public int criterio_busqueda { get; set; }
        public DateTime fecha_inicio { get; set; }
        public DateTime fecha_fin { get; set; }
    }

    public class modelodepreciacion
    {
        public int clase { get; set; }
        public DateTime hasta_fecha { get; set; }
    }

    public class respuestadepreciacion
    {
        public string clase { get; set; }
        public DateTime fecha { get; set; }
        public double depreciacion { get; set; }
        public double precioactual { get; set; }
    }
}