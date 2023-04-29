using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RoadMaster.DTOs.Request
{
    public class SegurosRequestDTO
    {
        public int Seg_Codigo { get; set; }

        public int TiS_Codigo { get; set; }

        public string Seg_Compañia { get; set; }

        public string Seg_Cobertura { get; set; }

        public int Seg_Telefono { get; set; }

        public string Seg_Vigencia { get; set; }
    }
}
