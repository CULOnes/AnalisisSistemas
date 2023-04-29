using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RoadMaster.DTOs.Request
{
    public class TiposReparacionesRequestDTO
    {
        public int TiR_Codigo { get; set; }
        public string TiR_Nombre { get; set; }
        public decimal TiR_Costo { get; set; }
        public int TiR_Tiempo { get; set; }
        public string TiR_Piezas { get; set; }
        public string TiR_Descripcion { get; set; }
    }
}
