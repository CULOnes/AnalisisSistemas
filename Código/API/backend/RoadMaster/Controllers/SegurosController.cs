using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RoadMaster.DTOs.Request;
using RoadMaster.DTOs.Responses;
using RoadMaster.Repositories;
using RoadMaster.Repositories.Entities;

namespace RoadMaster.Controllers
{
    [Route("api/Seguros")]
    [ApiController]
    public class SegurosController : ControllerBase
    {
        private readonly AppDBContext db;
        private readonly IConfiguration configuration;

        public SegurosController(AppDBContext context, IConfiguration configuration)
        {
            db = context;
            configuration = configuration;
        }

        [HttpGet("seguros")]
        public async ValueTask<ActionResult<SegurosResponseDTO>> Get()
        {
            try
            {
                var seguros = db.Seguros.ToArray();
                return Ok(seguros);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }

        //Reporte de Vehiculos
        [HttpPost("reporteseguros")]
        public async ValueTask<ActionResult<SegurosResponseDTO>> ReporteSeguros(ReporteSeg seguros)
        {
            try
            {
                int tipoS = 0;
                Seguros[]? busqueda = null;

                switch (seguros.tipobusqueda)
                {
                    case 1:
                        tipoS = Int32.Parse(seguros.valor);
                        busqueda = db.Seguros.Where(x => x.TiS_Codigo == tipoS).ToArray();
                        break;
                    case 2:
                        busqueda = db.Seguros.Where(x => x.Seg_Compañia == seguros.valor).ToArray();
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
        public async ValueTask<ActionResult<SegurosResponseDTO>> Actualizar(SegurosRequestDTO seguros)
        {
            try
            {
                if (seguros.Seg_Telefono < 0 || seguros.Seg_Telefono.ToString().Length > 8 || seguros.Seg_Telefono.ToString().Length < 8)
                {
                    return BadRequest("El numero de Telefono debe de contener 8 digitos y no pueden ser numeros negativos");
                }

                var seguro = db.Seguros.Find(seguros.Seg_Codigo);

                seguro.TiS_Codigo = seguros.TiS_Codigo;
                seguro.Seg_Compañia = seguros.Seg_Compañia;
                seguro.Seg_Cobertura = seguros.Seg_Cobertura;
                seguro.Seg_Telefono = seguros.Seg_Telefono;
                seguro.Seg_Vigencia = seguros.Seg_Vigencia;

                db.Entry(seguro).State = EntityState.Modified;
                db.SaveChanges();
                return Ok(seguro);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }

        [HttpPost("registroseguros")]
        public async ValueTask<ActionResult<SegurosResponseDTO>> Crear([FromBody] SegurosRequestDTO seguros)
        {
            try
            {

                if (seguros.Seg_Telefono < 0 || seguros.Seg_Telefono.ToString().Length > 8 || seguros.Seg_Telefono.ToString().Length < 8)
                {
                    return BadRequest("El numero de Telefono debe de contener 8 digitos y no pueden ser numeros negativos");
                }

                //var query = db.Seguros.ToArray();

                //var id = query.Count() + 1;

                var seguro = new Seguros
                {
                    //Seg_Codigo = id,
                    TiS_Codigo = seguros.TiS_Codigo,
                    Seg_Compañia = seguros.Seg_Compañia,
                    Seg_Cobertura = seguros.Seg_Cobertura,
                    Seg_Telefono = seguros.Seg_Telefono,
                    Seg_Vigencia = seguros.Seg_Vigencia
                };

                await db.Seguros.AddAsync(seguro);
                db.SaveChanges();
                return Ok(seguro);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }

        [HttpPut("eliminar")]
        public async ValueTask<ActionResult<SegurosResponseDTO>> Eliminar([FromBody] SegurosRequestDTO seguros)
        {
            try
            {
                var seguro = db.Seguros.Find(seguros.Seg_Codigo);
                if (seguro != null)
                {
                    db.Seguros.Remove(seguro);
                    db.SaveChanges();
                }
                return Ok(seguro);
            }
            catch (Exception ex)
            {
                return BadRequest("Error interno, contacte administrador");
            }
        }
    }

    public class ReporteSeg
    {
        public int tipobusqueda { get; set; }
        public string valor { get; set; }
    }
}