using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RoadMaster.DTOs.Request
{
    public class UbicacionesFisicasRequestDTO
    {
        public int UbF_Codigo { get; set; }

        public string UbF_Ubicacion { get; set; }

        public string UbF_Descripcion { get; set; }
    }
}
