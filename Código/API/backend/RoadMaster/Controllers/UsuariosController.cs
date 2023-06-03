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
    [Route("api/Usuarios")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly AppDBContext db;
        private readonly IConfiguration Configuration;
        private readonly Login log = new Login();

        public UsuariosController(AppDBContext context, IConfiguration configuration)
        {
            db = context;
            Configuration = configuration;
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
                return BadRequest("Error interno, contacte administrador");
            }
        }

        [HttpPost("login")]
        public async ValueTask<ActionResult<LoginResponse>> Login(LoginRequets login)
        {            
            try
            {

                var encriptedPassword = log.encripter(login.contraseña);
                var query = db.Usuarios.Where(x => x.Usu_NombreUsuario == login.usuario && x.Usu_Contrasena == encriptedPassword).FirstOrDefault();

                if (query == null)
                {
                    return NotFound("No ha sido posible identificar al Usuario");
                }

                return Ok(log.Token(query, Configuration));

            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
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
                return BadRequest("Error interno, contacte administrador");
            }
        }

        [HttpPost("registrousuarios")]
        public async ValueTask<ActionResult<UsuariosResponseDTO>> Crear([FromBody] UsuariosRequestDTO usuarios)
        {
            try
            {

                //var query = db.Usuarios.ToArray();

                //var id = query.Count() + 1;

                var encriptedpassword = log.encripter(usuarios.Usu_Contrasena);

                var usuario = new Usuarios
                {
                    //Usu_Codigo = id,
                    Usu_NombreUsuario = usuarios.Usu_NombreUsuario,
                    Usu_Nombre = usuarios.Usu_Nombre,
                    Usu_Apellido = usuarios.Usu_Apellido,
                    Usu_Correo = usuarios.Usu_Correo,
                    Usu_Contrasena = encriptedpassword
                };

                await db.Usuarios.AddAsync(usuario);
                db.SaveChanges();
                return Ok(usuario);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
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
                return BadRequest("Error interno, contacte administrador");
            }
        }
    }

    public class LoginRequets
    {
        public string usuario { get; set; }
        public string contraseña { get; set; }
    }

    public class LoginResponse
    {
        public string Token { get; set; }
    }
}