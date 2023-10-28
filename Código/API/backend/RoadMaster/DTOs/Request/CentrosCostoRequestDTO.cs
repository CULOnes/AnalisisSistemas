using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RoadMaster.DTOs.Request
{
    public class CentrosCostoRequestDTO
    {
        public int CeC_Codigo { get; set; }

        public int Cue_Codigo { get; set; }

        public string CeC_Nombre { get; set; }

        public string CeC_Descripcion { get; set; }
    }
}
