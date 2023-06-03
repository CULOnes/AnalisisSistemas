using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Principal;

namespace RoadMaster.Repositories.Entities
{
    public class Mantenimientos
    {
        public int man_Codigo { get; set; }
        public int tiR_Codigo { get; set; }
        public int ins_Codigo { get; set; }
        public DateTime man_Fecha { get; set; }
        public int man_Kilometraje { get; set; }
        public string man_Estado { get; set; }
    }
}
