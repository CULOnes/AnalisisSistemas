using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RoadMaster.DTOs.Request;
using RoadMaster.DTOs.Responses;
using RoadMaster.Repositories;
using RoadMaster.Repositories.Entities;

namespace RoadMaster.Controllers
{
    [Route("api/Combustibles")]
    [ApiController]
    public class CombustiblesController : ControllerBase
    {
        private readonly AppDBContext db;
        private readonly IConfiguration configuration;

        public CombustiblesController(AppDBContext context, IConfiguration configuration)
        {
            db = context;
            configuration = configuration;
        }

        [HttpGet("combustibles")]
        public async ValueTask<ActionResult<CombustiblesResponseDTO>> Get()
        {
            try
            {
                var combustibles = db.Combustibles.ToArray();
                return Ok(combustibles);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPut("actualizar")]
        public async ValueTask<ActionResult<CombustiblesResponseDTO>> Actualizar(combustiblesRequestDTO combustibles)
        {
            try
            {

                var combustible = db.Combustibles.Find(combustibles.Com_Codigo);

                combustible.Com_TipoCombustible = combustibles.Com_TipoCombustible;
                combustible.Com_Marca = combustibles.Com_Marca;

                db.Entry(combustible).State = EntityState.Modified;
                db.SaveChanges();
                return Ok(combustible);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("registrocombustibles")]
        public async ValueTask<ActionResult<CombustiblesResponseDTO>> Crear([FromBody] combustiblesRequestDTO combustibles)
        {
            try
            {

                var query = db.Combustibles.ToArray();

                var id = query.Count() + 1;

                var combustible = new Combustibles
                {
                    Com_Codigo = id,
                    Com_TipoCombustible = combustibles.Com_TipoCombustible,
                    Com_Marca = combustibles.Com_Marca
                };

                await db.Combustibles.AddAsync(combustible);
                db.SaveChanges();
                return Ok(combustible);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("eliminar")]
        public async ValueTask<ActionResult<CombustiblesResponseDTO>> Eliminar([FromBody] combustiblesRequestDTO combustibles)
        {
            try
            {

                var combustible = db.Combustibles.Find(combustibles.Com_Codigo);
                if (combustible != null)
                {
                    db.Combustibles.Remove(combustible);
                    db.SaveChanges();
                }
                return Ok(combustible);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}