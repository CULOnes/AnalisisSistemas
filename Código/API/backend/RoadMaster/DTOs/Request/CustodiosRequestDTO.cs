using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RoadMaster.DTOs.Request
{
    public class CustodiosRequestDTO
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
