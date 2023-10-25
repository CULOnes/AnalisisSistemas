using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Principal;

namespace RoadMaster.Repositories.Entities
{
    public class Usuarios
    {
        public int Usu_Codigo { get; set; }

        public string Usu_NombreUsuario { get; set; }

        public string Usu_Nombre { get; set; }

        public string Usu_Apellido { get; set; }

        public string Usu_Clave { get; set; }
    }
}
