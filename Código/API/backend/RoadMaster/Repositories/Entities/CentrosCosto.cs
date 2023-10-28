using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Principal;

namespace RoadMaster.Repositories.Entities
{
    public class CentrosCosto
    {
        public int CeC_Codigo { get; set; }

        public int Cue_Codigo { get; set; }

        public string CeC_Nombre { get; set; }

        public string CeC_Descripcion { get; set; }
    }
}
