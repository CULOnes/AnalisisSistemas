using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Principal;

namespace RoadMaster.Repositories.Entities
{
    public class Custodios
    {
        public int Cus_Codigo { get; set; }

        public int Suc_Codigo { get; set; }

        public int Dep_Codigo { get; set; }

        public Int64 Cus_DPI { get; set; }

        public string Cus_Nombre { get; set; }

        public string Cus_Apellido { get; set; }

        public string Cus_Cargo { get; set; }
    }
}
