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
                return BadRequest(ex.Message);
            }
        }


        [HttpPut("actualizar")]
        public async ValueTask<ActionResult<SegurosResponseDTO>> Actualizar(SegurosRequestDTO seguros)
        {
            try
            {
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
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("registroseguros")]
        public async ValueTask<ActionResult<SegurosResponseDTO>> Crear([FromBody] SegurosRequestDTO seguros)
        {
            try
            {

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
                return BadRequest(ex.Message);
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
                return BadRequest(ex.Message);
            }
        }
    }
}