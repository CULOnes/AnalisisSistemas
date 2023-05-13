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
            builder.HasKey(x => x.man_codigo);

            builder.Property(x => x.man_codigo).HasColumnName("man_codigo");
            builder.Property(x => x.tir_codigo).HasColumnName("tir_codigo");
            builder.Property(x => x.ins_codigo).HasColumnName("ins_codigo");
            builder.Property(x => x.man_fecha).HasColumnName("man_fecha");
            builder.Property(x => x.man_kilometraje).HasColumnName("man_kilometraje");
            builder.Property(x => x.man_estado).HasColumnName("man_estado");
        }
    }
}
