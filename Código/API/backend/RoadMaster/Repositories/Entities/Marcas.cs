using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Principal;

namespace RoadMaster.Repositories.Entities
{
    public class Marcas
    {
        public int Mar_Codigo { get; set; }

        public string Mar_Nombre { get; set; }

        public string Mar_Descripcion { get; set; }
    }
}
