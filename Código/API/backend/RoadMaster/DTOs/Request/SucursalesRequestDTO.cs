using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RoadMaster.DTOs.Request
{
    public class SucursalesRequestDTO
    {
        public int Suc_Codigo { get; set; }

        public string Suc_Nombre { get; set; }
    }
}
