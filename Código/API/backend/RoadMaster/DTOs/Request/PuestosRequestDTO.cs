using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RoadMaster.DTOs.Request
{
    public class PuestosRequestDTO
    {
        public int pue_Codigo { get; set; }

        public string pue_Nombre { get; set; }

        public string pue_Descripcion { get; set; }
    }
}
