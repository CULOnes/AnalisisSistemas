using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Principal;

namespace RoadMaster.Repositories.Entities
{
    public class Cuentas
    {
        public int Cue_Codigo { get; set; }

        public string Cue_Nombre { get; set; }

        public string Cue_Descripcion { get; set; }

        public string Cue_Tipo { get; set; }
    }
}
