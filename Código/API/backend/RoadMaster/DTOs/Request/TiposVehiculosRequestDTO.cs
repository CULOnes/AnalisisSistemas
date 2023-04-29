using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RoadMaster.DTOs.Request
{
    public class TiposVehiculosRequestDTO
    {
        public int TiV_Codigo { get; set; }

        public string TiV_Nombre { get; set; }

        public string TiV_Capacidad { get; set; }

        public string TiV_Tonelaje { get; set; }

        public string TiV_Descripcion { get; set; }
    }
}
