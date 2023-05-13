using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoadMaster.Repositories.Entities;

namespace RoadMaster.Repositories.Configurations
{
    public class AsignacionesConfiguration : IEntityTypeConfiguration<Asignaciones>
    {
        public void Configure(EntityTypeBuilder<Asignaciones> builder)
        {
            builder.ToTable("rom_asignaciones");
            builder.HasKey(x => x.asi_codigo);

            builder.Property(x => x.asi_codigo).HasColumnName("asi_codigo");
            builder.Property(x => x.usu_codigo).HasColumnName("usu_codigo");
            builder.Property(x => x.ins_codigo).HasColumnName("ins_codigo");
            builder.Property(x => x.veh_codigo).HasColumnName("veh_codigo");
            builder.Property(x => x.emp_codigo).HasColumnName("emp_codigo");
            builder.Property(x => x.cli_codigo).HasColumnName("cli_codigo");
            builder.Property(x => x.seg_codigo).HasColumnName("seg_codigo");
            builder.Property(x => x.asi_kilometraje).HasColumnName("asi_kilometraje");
            builder.Property(x => x.asi_fechasalida).HasColumnName("asi_fechasalida");
            builder.Property(x => x.asi_fechaentrada).HasColumnName("asi_fechaentrada");
            builder.Property(x => x.asi_observaciones).HasColumnName("asi_observaciones");
        }
    }
}
