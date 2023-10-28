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
    [Route("api/Proveedores")]
    [ApiController]
    public class ProveedoresController : ControllerBase
    {
        private readonly AppDBContext db;
        private readonly IConfiguration Configuration;
        private readonly Login log = new Login();

        public ProveedoresController(AppDBContext context, IConfiguration configuration)
        {
            db = context;
            Configuration = configuration;
        }

        [HttpGet("proveedores")]
        public async ValueTask<ActionResult<Proveedores>> Get()
        {
            try
            {
                Proveedores[] proveedores = new Proveedores[5];
                proveedores[0] = new Proveedores { Pro_Codigo = 1, Pro_Nombre = "Max" };
                proveedores[1] = new Proveedores { Pro_Codigo = 2, Pro_Nombre = "Electronica Panamericana" };
                proveedores[2] = new Proveedores { Pro_Codigo = 3, Pro_Nombre = "Volvo" };
                proveedores[3] = new Proveedores { Pro_Codigo = 4, Pro_Nombre = "Muebles Fiesta" };
                proveedores[4] = new Proveedores { Pro_Codigo = 5, Pro_Nombre = "Libreria Platino" };

                return Ok(proveedores);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }
    }
}