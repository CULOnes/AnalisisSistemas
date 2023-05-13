namespace RoadMaster.DTOs.Responses
{
    public class MantenimientosResponseDTO
    {
        public int man_codigo { get; set; }
        public int tir_codigo { get; set; }
        public int ins_codigo { get; set; }
        public DateTime man_fecha { get; set; }
        public int man_kilometraje { get; set; }
        public string man_estado { get; set; }
    }
}
