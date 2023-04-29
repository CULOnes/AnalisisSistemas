using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RoadMaster.DTOs.Request
{
    public class combustiblesRequestDTO
    {

        public int Com_Codigo { get; set; }

        public string Com_TipoCombustible { get; set; }

        public string Com_Marca { get; set; }
    }
}
