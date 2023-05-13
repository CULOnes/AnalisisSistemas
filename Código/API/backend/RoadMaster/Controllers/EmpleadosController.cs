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
                return BadRequest(ex.Message);
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
                        busqueda = db.Empleados.Where(x => x.emp_dpi == empleados.valor).ToArray();
                        break;
                    case 2:
                        busqueda = db.Empleados.Where(x => x.emp_nolicencia == empleados.valor).ToArray();
                        break;
                    case 3:
                        busqueda = db.Empleados.Where(x => x.emp_tipolicencia == empleados.valor).ToArray();
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
        public async ValueTask<ActionResult<EmpleadosResponseDTO>> Actualizar(EmpleadosRequestDTO empleados)
        {
            try
            {

                var empleado = db.Empleados.Find(empleados.emp_codigo);

                empleado.pue_codigo = empleados.pue_codigo;
                empleado.emp_nombre = empleados.emp_nombre;
                empleado.emp_apellido = empleados.emp_apellido;
                empleado.emp_direccion = empleados.emp_direccion;
                empleado.emp_telefono = empleados.emp_telefono;
                empleado.emp_dpi = empleados.emp_dpi;
                empleado.emp_edad = empleados.emp_edad;
                empleado.emp_nacimiento = empleados.emp_nacimiento;
                empleado.emp_nolicencia = empleados.emp_nolicencia;
                empleado.emp_tipolicencia = empleados.emp_tipolicencia;

                db.Entry(empleado).State = EntityState.Modified;
                db.SaveChanges();
                return Ok(empleado);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("registroempleados")]
        public async ValueTask<ActionResult<EmpleadosResponseDTO>> Crear([FromBody] EmpleadosRequestDTO empleados)
        {
            try
            {

                //var query = db.Vehiculos.ToArray();

                //var id = query.Count() + 1;

                var empleado = new Empleados
                {
                    //Veh_Codigo = id,
                    pue_codigo = empleados.pue_codigo,
                    emp_nombre = empleados.emp_nombre,
                    emp_apellido = empleados.emp_apellido,
                    emp_direccion = empleados.emp_direccion,
                    emp_telefono = empleados.emp_telefono,
                    emp_dpi = empleados.emp_dpi,
                    emp_edad = empleados.emp_edad,
                    emp_nacimiento = empleados.emp_nacimiento,
                    emp_nolicencia = empleados.emp_nolicencia,
                    emp_tipolicencia = empleados.emp_tipolicencia
                };

                await db.Empleados.AddAsync(empleado);
                db.SaveChanges();
                return Ok(empleado);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("eliminar")]
        public async ValueTask<ActionResult<EmpleadosResponseDTO>> Eliminar([FromBody] EmpleadosRequestDTO empleados)
        {
            try
            {

                var empleado = db.Empleados.Find(empleados.emp_codigo);
                if (empleado != null)
                {
                    db.Empleados.Remove(empleado);
                    db.SaveChanges();
                }
                return Ok(empleado);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }

    public class ReporteEmp
    {
        public int tipobusqueda { get; set; }
        public string valor { get; set; }
    }
}