using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Principal;

namespace RoadMaster.Repositories.Entities
{
    public class Inspecciones
    {
        public int Ins_Codigo { get; set; }

        public string Usu_Codigo { get; set; }

        public string Veh_Codigo { get; set; }

        public string Ins_KilometrajeActual { get; set; }

        public string Ins_Aprobacion { get; set; }

        public string Ins_Estado { get; set; }
        public DateTime? INS_Fecha { get; set; }
        public string INS_Descripcion { get; set; }
    }
}
