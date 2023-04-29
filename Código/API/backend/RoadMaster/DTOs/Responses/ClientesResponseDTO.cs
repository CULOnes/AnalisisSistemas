namespace RoadMaster.DTOs.Responses
{
    public class ClientesResponseDTO
    {
        public int Cli_Codigo { get; set; }

        public string Cli_Nombre { get; set; }

        public string Cli_Apellido { get; set; }

        public string Cli_Correo { get; set; }

        public int Cli_TelefonoCelular { get; set; }

        public int Cli_TelefonoSecundario { get; set; }
        public string Cli_Direccion { get; set; }
    }
}
