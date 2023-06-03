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
            builder.HasKey(x => x.asi_Codigo);

            builder.Property(x => x.asi_Codigo).HasColumnName("asi_Codigo");
            builder.Property(x => x.usu_Codigo).HasColumnName("usu_Codigo");
            builder.Property(x => x.ins_Codigo).HasColumnName("ins_Codigo");
            builder.Property(x => x.veh_Codigo).HasColumnName("veh_Codigo");
            builder.Property(x => x.emp_Codigo).HasColumnName("emp_Codigo");
            builder.Property(x => x.cli_Codigo).HasColumnName("cli_Codigo");
            builder.Property(x => x.seg_Codigo).HasColumnName("seg_Codigo");
            builder.Property(x => x.asi_Kilometraje).HasColumnName("asi_Kilometraje");
            builder.Property(x => x.asi_Fechasalida).HasColumnName("asi_Fechasalida");
            builder.Property(x => x.asi_Fechaentrada).HasColumnName("asi_Fechaentrada");
            builder.Property(x => x.asi_Observaciones).HasColumnName("asi_Observaciones");
        }
    }
}
