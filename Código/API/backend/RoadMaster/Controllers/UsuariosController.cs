using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RoadMaster.DTOs.Request;
using RoadMaster.DTOs.Responses;
using RoadMaster.Repositories;
using RoadMaster.Repositories.Entities;

namespace RoadMaster.Controllers
{
    [Route("api/Usuarios")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly AppDBContext db;
        private readonly IConfiguration configuration;

        public UsuariosController(AppDBContext context, IConfiguration configuration)
        {
            db = context;
            configuration = configuration;
        }

        [HttpGet("usuarios")]
        public async ValueTask<ActionResult<UsuariosResponseDTO>> Get()
        {
            try
            {
                var usuarios = db.Usuarios.ToArray();
                return Ok(usuarios);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPut("actualizar")]
        public async ValueTask<ActionResult<UsuariosResponseDTO>> Actualizar(UsuariosRequestDTO usuarios)
        {
            try
            {

                var usuario = db.Usuarios.Find(usuarios.Usu_Codigo);

                usuario.Usu_NombreUsuario = usuarios.Usu_NombreUsuario;
                usuario.Usu_Nombre = usuarios.Usu_Nombre;
                usuario.Usu_Apellido = usuarios.Usu_Apellido;
                usuario.Usu_Correo = usuarios.Usu_Correo;

                db.Entry(usuario).State = EntityState.Modified;
                db.SaveChanges();
                return Ok(usuario);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("registrousuarios")]
        public async ValueTask<ActionResult<UsuariosResponseDTO>> Crear([FromBody] UsuariosRequestDTO usuarios)
        {
            try
            {

                var query = db.Usuarios.ToArray();

                var id = query.Count() + 1;

                var usuario = new Usuarios
                {
                    Usu_Codigo = id,
                    Usu_NombreUsuario = usuarios.Usu_NombreUsuario,
                    Usu_Nombre = usuarios.Usu_Nombre,
                    Usu_Apellido = usuarios.Usu_Apellido,
                    Usu_Correo = usuarios.Usu_Correo,
                    Usu_Contrasena = usuarios.Usu_Contrasena
                };

                await db.Usuarios.AddAsync(usuario);
                db.SaveChanges();
                return Ok(usuario);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("eliminar")]
        public async ValueTask<ActionResult<UsuariosResponseDTO>> Eliminar([FromBody] UsuariosRequestDTO usuarios)
        {
            try
            {

                var usuario = db.Usuarios.Find(usuarios.Usu_Codigo);
                if (usuario != null)
                {
                    db.Usuarios.Remove(usuario);
                    db.SaveChanges();
                }
                return Ok(usuario);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}