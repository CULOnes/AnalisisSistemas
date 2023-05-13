using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RoadMaster.DTOs.Request
{
    public class EmpleadosRequestDTO
    {
        public int emp_codigo { get; set; }
        public int pue_codigo { get; set; }
        public string emp_nombre { get; set; }
        public string emp_apellido { get; set; }
        public string emp_direccion { get; set; }
        public int emp_telefono { get; set; }
        public string emp_dpi { get; set; }
        public int emp_edad { get; set; }
        public DateTime emp_nacimiento { get; set; }
        public string emp_nolicencia { get; set; }
        public string emp_tipolicencia { get; set; }
    }
}
