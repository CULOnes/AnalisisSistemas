using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Principal;

namespace RoadMaster.Repositories.Entities
{
    public class Sucursales
    {
        public int Suc_Codigo { get; set; }

        public string Suc_Nombre { get; set; }
    }
}
