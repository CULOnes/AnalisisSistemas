using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Principal;

namespace RoadMaster.Repositories.Entities
{
    public class Proveedores
    {
        public int Pro_Codigo { get; set; }

        public string Pro_Nombre { get; set; }
    }
}
