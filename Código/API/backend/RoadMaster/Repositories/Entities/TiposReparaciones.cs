using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Principal;

namespace RoadMaster.Repositories.Entities
{
    public class TiposReparaciones
    {
        public int TiR_Codigo { get; set; }
        public string TiR_Nombre { get; set; }
        public decimal TiR_Costo { get; set; }
        public int TiR_Tiempo { get; set; }
        public string TiR_Piezas { get; set; }
        public string TiR_Descripcion { get; set; }
    }
}
