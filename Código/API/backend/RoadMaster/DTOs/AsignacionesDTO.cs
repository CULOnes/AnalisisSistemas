namespace RoadMaster.DTOs
{
    public class AsignacionesDTO
    {
        public int asi_codigo { get; set; }
        public int usu_codigo { get; set; }
        public int ins_codigo { get; set; }
        public int veh_codigo { get; set; }
        public int emp_codigo { get; set; }
        public int cli_codigo { get; set; }
        public int seg_codigo { get; set; }
        public int asi_kilometraje { get; set; }
        public DateTime asi_fechasalida { get; set; }
        public DateTime? asi_fechaentrada { get; set; }
        public string asi_observaciones { get; set; }
    }
}
