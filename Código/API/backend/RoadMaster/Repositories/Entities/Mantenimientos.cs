using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Principal;

namespace RoadMaster.Repositories.Entities
{
    public class Mantenimientos
    {
        public int man_codigo { get; set; }
        public int tir_codigo { get; set; }
        public int ins_codigo { get; set; }
        public DateTime man_fecha { get; set; }
        public int man_kilometraje { get; set; }
        public string man_estado { get; set; }
    }
}
