namespace RoadMaster.DTOs.Responses
{
    public class VehiculosResponseDTO
    {
        public int Veh_Codigo { get; set; }
        public int TiV_Codigo { get; set; }
        public int Com_Codigo { get; set; }
        public string Veh_Marca { get; set; }
        public string Veh_Placa { get; set; }
        public string Veh_Modelo { get; set; }
        public int Veh_Año { get; set; }
        public int Veh_KilometrajeInicial { get; set; }
        public string Veh_Color { get; set; }
        public string Veh_Transmision { get; set; }
    }
}
