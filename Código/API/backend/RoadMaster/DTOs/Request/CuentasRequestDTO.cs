using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RoadMaster.DTOs.Request
{
    public class CuentasRequestDTO
    {
        public int Cue_Codigo { get; set; }

        public string Cue_Nombre { get; set; }

        public string Cue_Descripcion { get; set; }

        public string Cue_Tipo { get; set; }
    }
}
