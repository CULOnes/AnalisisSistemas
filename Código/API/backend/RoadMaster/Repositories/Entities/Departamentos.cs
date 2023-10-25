using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Principal;

namespace RoadMaster.Repositories.Entities
{
    public class Departamentos
    {
        public int Dep_Codigo { get; set; }

        public string Dep_Nombre { get; set; }

        public string Dep_Descripcion { get; set; }

        public string Dep_Jefe { get; set; }
    }
}
