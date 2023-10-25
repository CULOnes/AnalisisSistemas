using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Principal;

namespace RoadMaster.Repositories.Entities
{
    public class Estados
    {
        public int Est_Codigo { get; set; }

        public string Est_Nombre { get; set; }

        public string Est_Descripcion { get; set; }

        public bool Est_Baja { get; set; }
    }
}
