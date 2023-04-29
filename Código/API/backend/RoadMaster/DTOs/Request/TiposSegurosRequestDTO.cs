using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RoadMaster.DTOs.Request
{
    public class TiposSegurosRequestDTO
    {
        public int TiS_Codigo { get; set; }
        public string TiS_Nombre { get; set; }
        public string TiS_Descripcion { get; set; }
    }
}
