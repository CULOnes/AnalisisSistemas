using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RoadMaster.DTOs.Request
{
    public class EstadosRequestDTO
    {
        public int Est_Codigo { get; set; }

        public string Est_Nombre { get; set; }

        public string Est_Descripcion { get; set; }

        public bool Est_Baja { get; set; }
    }
}
