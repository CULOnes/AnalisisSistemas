using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoadMaster.Repositories.Entities;

namespace RoadMaster.Repositories.Configurations
{
    public class EmpleadosConfiguration : IEntityTypeConfiguration<Empleados>
    {
        public void Configure(EntityTypeBuilder<Empleados> builder)
        {
            builder.ToTable("rom_empleados");
            builder.HasKey(x => x.emp_Codigo);

            builder.Property(x => x.emp_Codigo).HasColumnName("emp_codigo");
            builder.Property(x => x.pue_Codigo).HasColumnName("pue_codigo");
            builder.Property(x => x.emp_Nombre).HasColumnName("emp_nombre");
            builder.Property(x => x.emp_Apellido).HasColumnName("emp_apellido");
            builder.Property(x => x.emp_Direccion).HasColumnName("emp_direccion");
            builder.Property(x => x.emp_Telefono).HasColumnName("emp_telefono");
            builder.Property(x => x.emp_Dpi).HasColumnName("emp_dpi");
            builder.Property(x => x.emp_Edad).HasColumnName("emp_edad");
            builder.Property(x => x.emp_Nacimiento).HasColumnName("emp_nacimiento");
            builder.Property(x => x.emp_Nolicencia).HasColumnName("emp_nolicencia");
            builder.Property(x => x.emp_Tipolicencia).HasColumnName("emp_tipolicencia");
        }
    }
}
