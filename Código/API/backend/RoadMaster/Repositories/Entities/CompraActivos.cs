using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Principal;

namespace RoadMaster.Repositories.Entities
{
    public class validarFactura
    {
        public DateTime Act_FechaIgreso { get; set; }
    }

    public class validarActivo
    {
        public int Act_Codigo { get; set; }
        public string Act_Nombre { get; set; }
        public int Mar_Codigo { get; set; }
        public int Est_Codigo { get; set; }
        public int Act_ValorInicial { get; set; }
    }
}
