using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RoadMaster.DTOs.Request
{
    public class MantenimientosRequestDTO
    {
        public int man_Codigo { get; set; }
        public int tiR_Codigo { get; set; }
        public int ins_Codigo { get; set; }
        public DateTime man_Fecha { get; set; }
        public int man_Kilometraje { get; set; }
        public string man_Estado { get; set; }
    }
}
