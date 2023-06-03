using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RoadMaster.DTOs.Request;
using RoadMaster.DTOs.Responses;
using RoadMaster.Repositories;
using RoadMaster.Repositories.Entities;

namespace RoadMaster.Controllers
{
    [Route("api/Empleados")]
    [ApiController]
    public class EmpleadosController : ControllerBase
    {
        private readonly AppDBContext db;
        private readonly IConfiguration configuration;

        public EmpleadosController(AppDBContext context, IConfiguration configuration)
        {
            db = context;
            configuration = configuration;
        }

        [HttpGet("empleados")]
        public async ValueTask<ActionResult<EmpleadosResponseDTO>> Get()
        {
            try
            {
                var empleados = db.Empleados.ToArray();
                return Ok(empleados);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }

        //Reporte de Vehiculos
        [HttpPost("reporteempleados")]
        public async ValueTask<ActionResult<EmpleadosResponseDTO>> ReporteEmpleados(ReporteEmp empleados)
        {
            try
            {
                Empleados[]? busqueda = null;

                switch (empleados.tipobusqueda)
                {
                    case 1:
                        busqueda = db.Empleados.Where(x => x.emp_Dpi == empleados.valor).ToArray();
                        break;
                    case 2:
                        busqueda = db.Empleados.Where(x => x.emp_Nolicencia == empleados.valor).ToArray();
                        break;
                    case 3:
                        busqueda = db.Empleados.Where(x => x.emp_Tipolicencia == empleados.valor).ToArray();
                        break;
                    default:
                        break;
                }

                return Ok(busqueda);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }

        [HttpPut("actualizar")]
        public async ValueTask<ActionResult<EmpleadosResponseDTO>> Actualizar(EmpleadosRequestDTO empleados)
        {
            try
            {

                DateTime fechamenor = DateTime.Now.AddYears(-18);

                if (empleados.emp_Telefono < 0 || empleados.emp_Telefono.ToString().Length > 8 || empleados.emp_Telefono.ToString().Length < 8)
                {
                    return BadRequest("El numero de Telefono debe de contener 8 digitos y no pueden ser numeros negativos");
                }

                if (Int64.Parse(empleados.emp_Dpi) < 0 || empleados.emp_Dpi.Length > 13 || empleados.emp_Dpi.Length < 13)
                {
                    return BadRequest("Ingrese un numero de DPI Valido");
                }

                if (empleados.emp_Edad < 18 || empleados.emp_Telefono.ToString().Length > 75)
                {
                    return BadRequest("Ingrese una edad valida");
                }

                if (empleados.emp_Nacimiento > fechamenor)
                {
                    return BadRequest("La fecha de nacimiento no es valida");
                }

                var empleado = db.Empleados.Find(empleados.emp_Codigo);

                empleado.pue_Codigo = empleados.pue_Codigo;
                empleado.emp_Nombre = empleados.emp_Nombre;
                empleado.emp_Apellido = empleados.emp_Apellido;
                empleado.emp_Direccion = empleados.emp_Direccion;
                empleado.emp_Telefono = empleados.emp_Telefono;
                empleado.emp_Dpi = empleados.emp_Dpi;
                empleado.emp_Edad = empleados.emp_Edad;
                empleado.emp_Nacimiento = empleados.emp_Nacimiento;
                empleado.emp_Nolicencia = empleados.emp_Nolicencia;
                empleado.emp_Tipolicencia = empleados.emp_Tipolicencia;

                db.Entry(empleado).State = EntityState.Modified;
                db.SaveChanges();
                return Ok(empleado);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }

        [HttpPost("registroempleados")]
        public async ValueTask<ActionResult<EmpleadosResponseDTO>> Crear([FromBody] EmpleadosRequestDTO empleados)
        {
            try
            {

                DateTime fechamenor = DateTime.Now.AddYears(-18);

                if (empleados.emp_Telefono < 0 || empleados.emp_Telefono.ToString().Length > 8 || empleados.emp_Telefono.ToString().Length < 8)
                {
                    return BadRequest("El numero de Telefono debe de contener 8 digitos y no pueden ser numeros negativos");
                }

                if (Int64.Parse(empleados.emp_Dpi) < 0 || empleados.emp_Dpi.Length > 13 || empleados.emp_Dpi.Length < 13)
                {
                    return BadRequest("Ingrese un numero de DPI Valido");
                }

                if (empleados.emp_Edad < 18 || empleados.emp_Telefono.ToString().Length > 75)
                {
                    return BadRequest("Ingrese una edad valida");
                }

                if (empleados.emp_Nacimiento > fechamenor)
                {
                    return BadRequest("La fecha de nacimiento no es valida");
                }

                var empleado = new Empleados
                {
                    //Veh_Codigo = id,
                    pue_Codigo = empleados.pue_Codigo,
                    emp_Nombre = empleados.emp_Nombre,
                    emp_Apellido = empleados.emp_Apellido,
                    emp_Direccion = empleados.emp_Direccion,
                    emp_Telefono = empleados.emp_Telefono,
                    emp_Dpi = empleados.emp_Dpi,
                    emp_Edad = empleados.emp_Edad,
                    emp_Nacimiento = empleados.emp_Nacimiento,
                    emp_Nolicencia = empleados.emp_Nolicencia,
                    emp_Tipolicencia = empleados.emp_Tipolicencia
                };

                await db.Empleados.AddAsync(empleado);
                db.SaveChanges();
                return Ok(empleado);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }

        [HttpPut("eliminar")]
        public async ValueTask<ActionResult<EmpleadosResponseDTO>> Eliminar([FromBody] EmpleadosRequestDTO empleados)
        {
            try
            {

                var empleado = db.Empleados.Find(empleados.emp_Codigo);
                if (empleado != null)
                {
                    db.Empleados.Remove(empleado);
                    db.SaveChanges();
                }
                return Ok(empleado);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }
    }

    public class ReporteEmp
    {
        public int tipobusqueda { get; set; }
        public string valor { get; set; }
    }
}