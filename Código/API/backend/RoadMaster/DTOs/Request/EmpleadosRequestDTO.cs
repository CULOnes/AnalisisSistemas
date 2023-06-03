﻿using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RoadMaster.DTOs.Request
{
    public class EmpleadosRequestDTO
    {
        public int emp_Codigo { get; set; }
        public int pue_Codigo { get; set; }
        public string emp_Nombre { get; set; }
        public string emp_Apellido { get; set; }
        public string emp_Direccion { get; set; }
        public int emp_Telefono { get; set; }
        public string emp_Dpi { get; set; }
        public int emp_Edad { get; set; }
        public DateTime emp_Nacimiento { get; set; }
        public string? emp_Nolicencia { get; set; }
        public string? emp_Tipolicencia { get; set; }
    }
}
