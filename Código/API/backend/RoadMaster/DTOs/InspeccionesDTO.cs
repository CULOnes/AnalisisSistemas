﻿namespace RoadMaster.DTOs
{
    public class InspeccionesDTO
    {
        public int Ins_Codigo { get; set; }

        public int Usu_Codigo { get; set; }

        public int Veh_Codigo { get; set; }

        public int Ins_KilometrajeActual { get; set; }

        public string Ins_Aprobacion { get; set; }

        public string Ins_Estado { get; set; }
        public DateTime Ins_Fecha { get; set; }
        public string Ins_Descripcion { get; set; }
    }
}
