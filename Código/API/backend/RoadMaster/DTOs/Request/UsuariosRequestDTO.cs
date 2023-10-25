using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RoadMaster.DTOs.Request
{
    public class UsuariosRequestDTO
    {

        public int Usu_Codigo { get; set; }

        public string Usu_NombreUsuario { get; set; }

        public string Usu_Nombre { get; set; }

        public string Usu_Apellido { get; set; }

        public string Usu_Clave { get; set; }
    }

    public class UsuariosRequestDTOE
    {

        public int Usu_Codigo { get; set; }

        public string Usu_NombreUsuario { get; set; }

        public string Usu_Nombre { get; set; }

        public string Usu_Apellido { get; set; }
    }
}
