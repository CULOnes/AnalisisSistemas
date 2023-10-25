using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RoadMaster.DTOs.Request
{
    public class DepartamentosRequestDTO
    {
        public int Dep_Codigo { get; set; }

        public string Dep_Nombre { get; set; }

        public string Dep_Descripcion { get; set; }

        public string Dep_Jefe { get; set; }
    }
}
