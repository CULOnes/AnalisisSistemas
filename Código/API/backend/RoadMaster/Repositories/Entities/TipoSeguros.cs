using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Principal;

namespace RoadMaster.Repositories.Entities
{
    public class TiposSeguros
    {
        public int TiS_Codigo { get; set; }
        public string TiS_Nombre { get; set; }
        public string TiS_Descripcion { get; set; }
    }
}
