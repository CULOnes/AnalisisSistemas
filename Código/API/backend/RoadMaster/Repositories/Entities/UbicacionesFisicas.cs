using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Principal;

namespace RoadMaster.Repositories.Entities
{
    public class UbicacionesFisicas
    {
        public int UbF_Codigo { get; set; }

        public string UbF_Ubicacion { get; set; }

        public string UbF_Descripcion { get; set; }
    }
}
