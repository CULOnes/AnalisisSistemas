using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RoadMaster.DTOs.Request;
using RoadMaster.DTOs.Responses;
using RoadMaster.Repositories;
using RoadMaster.Repositories.Entities;

namespace RoadMaster.Controllers
{
    [Route("api/Clientes")]
    [ApiController]
    public class ClientesController : ControllerBase
    {
        private readonly AppDBContext db;
        private readonly IConfiguration configuration;

        public ClientesController(AppDBContext context, IConfiguration configuration)
        {
            db = context;
            configuration = configuration;
        }

        [HttpGet("clientes")]
        public async ValueTask<ActionResult<ClientesResponseDTO>> Get()
        {
            try
            {
                var clientes = db.Clientes.ToArray();
                return Ok(clientes);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPut("actualizar")]
        public async ValueTask<ActionResult<ClientesResponseDTO>> Actualizar(ClientesResponseDTO clientes)
        {
            try
            {

                var cliente = db.Clientes.Find(clientes.Cli_Codigo);

                cliente.Cli_Nombre = clientes.Cli_Nombre;
                cliente.Cli_Apellido = clientes.Cli_Apellido;
                cliente.Cli_Correo = clientes.Cli_Correo;
                cliente.Cli_TelefonoCelular = clientes.Cli_TelefonoCelular;
                cliente.Cli_TelefonoSecundario = clientes.Cli_TelefonoSecundario;
                cliente.Cli_Direccion = clientes.Cli_Direccion;

                db.Entry(cliente).State = EntityState.Modified;
                db.SaveChanges();
                return Ok(cliente);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("registroclientes")]
        public async ValueTask<ActionResult<ClientesResponseDTO>> Crear([FromBody] ClientesRequestDTO clientes)
        {
            try
            {

                var query = db.Clientes.ToArray();

                var id = query.Count() + 1;

                var cliente = new Clientes
                {
                    Cli_Codigo = id,
                    Cli_Nombre = clientes.Cli_Nombre,
                    Cli_Apellido = clientes.Cli_Apellido,
                    Cli_Correo = clientes.Cli_Correo,
                    Cli_TelefonoCelular = clientes.Cli_TelefonoCelular,
                    Cli_TelefonoSecundario = clientes.Cli_TelefonoSecundario,
                    Cli_Direccion = clientes.Cli_Direccion
                };

                await db.Clientes.AddAsync(cliente);
                db.SaveChanges();
                return Ok(cliente);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("eliminar")]
        public async ValueTask<ActionResult<ClientesResponseDTO>> Eliminar([FromBody] ClientesRequestDTO clientes)
        {
            try
            {

                var cliente = db.Clientes.Find(clientes.Cli_Codigo);
                if (cliente != null)
                {
                    db.Clientes.Remove(cliente);
                    db.SaveChanges();
                }
                return Ok(cliente);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
