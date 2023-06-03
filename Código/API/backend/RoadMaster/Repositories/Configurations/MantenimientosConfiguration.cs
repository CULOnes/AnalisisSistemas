using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoadMaster.Repositories.Entities;

namespace RoadMaster.Repositories.Configurations
{
    public class MantenimientosConfiguration : IEntityTypeConfiguration<Mantenimientos>
    {
        public void Configure(EntityTypeBuilder<Mantenimientos> builder)
        {
            builder.ToTable("rom_mantenimiento");
            builder.HasKey(x => x.man_Codigo);

            builder.Property(x => x.man_Codigo).HasColumnName("man_codigo");
            builder.Property(x => x.tiR_Codigo).HasColumnName("tir_codigo");
            builder.Property(x => x.ins_Codigo).HasColumnName("ins_codigo");
            builder.Property(x => x.man_Fecha).HasColumnName("man_fecha");
            builder.Property(x => x.man_Kilometraje).HasColumnName("man_kilometraje");
            builder.Property(x => x.man_Estado).HasColumnName("man_estado");
        }
    }
}
