using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Principal;

namespace RoadMaster.Repositories.Entities
{
    public class Combustibles
    {
        public int Com_Codigo { get; set; }
        public string Com_TipoCombustible { get; set; }
        public string Com_Marca { get; set; }
    }
}
