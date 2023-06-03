using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoadMaster.Repositories.Entities;

namespace RoadMaster.Repositories.Configurations
{
    public class PuestosConfiguration : IEntityTypeConfiguration<Puestos>
    {
        public void Configure(EntityTypeBuilder<Puestos> builder)
        {
            builder.ToTable("rom_puesto");
            builder.HasKey(x => x.pue_Codigo);

            builder.Property(x => x.pue_Codigo).HasColumnName("pue_Codigo");
            builder.Property(x => x.pue_Nombre).HasColumnName("pue_Nombre");
            builder.Property(x => x.pue_Descripcion).HasColumnName("pue_Descripcion");
        }
    }
}
