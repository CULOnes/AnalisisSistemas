using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Principal;

namespace RoadMaster.Repositories.Entities
{
    public class Asignaciones
    {
        public int asi_Codigo { get; set; }
        public int usu_Codigo { get; set; }
        public int ins_Codigo { get; set; }
        public int veh_Codigo { get; set; }
        public int emp_Codigo { get; set; }
        public int cli_Codigo { get; set; }
        public int seg_Codigo { get; set; }
        public int asi_Kilometraje { get; set; }
        public DateTime asi_Fechasalida { get; set; }
        public DateTime? asi_Fechaentrada { get; set; }
        public string asi_Observaciones { get; set; }
    }
}
