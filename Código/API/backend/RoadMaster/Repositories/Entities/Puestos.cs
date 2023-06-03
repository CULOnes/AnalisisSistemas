using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Principal;

namespace RoadMaster.Repositories.Entities
{
    public class Puestos
    {
        public int pue_Codigo { get; set; }

        public string pue_Nombre { get; set; }

        public string pue_Descripcion { get; set; }
    }
}
