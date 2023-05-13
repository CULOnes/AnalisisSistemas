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
            builder.HasKey(x => x.emp_codigo);

            builder.Property(x => x.emp_codigo).HasColumnName("emp_codigo");
            builder.Property(x => x.pue_codigo).HasColumnName("pue_codigo");
            builder.Property(x => x.emp_nombre).HasColumnName("emp_nombre");
            builder.Property(x => x.emp_apellido).HasColumnName("emp_apellido");
            builder.Property(x => x.emp_direccion).HasColumnName("emp_direccion");
            builder.Property(x => x.emp_telefono).HasColumnName("emp_telefono");
            builder.Property(x => x.emp_dpi).HasColumnName("emp_dpi");
            builder.Property(x => x.emp_edad).HasColumnName("emp_edad");
            builder.Property(x => x.emp_nacimiento).HasColumnName("emp_nacimiento");
            builder.Property(x => x.emp_nolicencia).HasColumnName("emp_nolicencia");
            builder.Property(x => x.emp_tipolicencia).HasColumnName("emp_tipolicencia");
        }
    }
}
