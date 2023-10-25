using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RoadMaster.DTOs.Request
{
    public class MarcasRequestDTO
    {
        public int Mar_Codigo { get; set; }

        public string Mar_Nombre { get; set; }

        public string Mar_Descripcion { get; set; }
    }
}
