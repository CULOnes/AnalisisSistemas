using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Principal;

namespace RoadMaster.Repositories.Entities
{
    public class TiposVehiculos
    {
        public int TiV_Codigo { get; set; }

        public string TiV_Nombre { get; set; }

        public string TiV_Capacidad { get; set; }

        public string TiV_Tonelaje { get; set; }

        public string TiV_Descripcion { get; set; }
    }
}
