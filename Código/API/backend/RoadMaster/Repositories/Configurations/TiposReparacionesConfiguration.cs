using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoadMaster.Repositories.Entities;

namespace RoadMaster.Repositories.Configurations
{
    public class TiposReparacionesConfiguration : IEntityTypeConfiguration<TiposReparaciones>
    {
        public void Configure(EntityTypeBuilder<TiposReparaciones> builder)
        {
            builder.ToTable("RoM_TipoReparaciones");
            builder.HasKey(x => x.TiR_Codigo);

            builder.Property(x => x.TiR_Codigo).HasColumnName("TiR_Codigo");
            builder.Property(x => x.TiR_Nombre).HasColumnName("TiR_Nombre");
            builder.Property(x => x.TiR_Costo).HasColumnName("TiR_Costo");
            builder.Property(x => x.TiR_Tiempo).HasColumnName("TiR_Tiempo");
            builder.Property(x => x.TiR_Piezas).HasColumnName("TiR_Piezas");
            builder.Property(x => x.TiR_Descripcion).HasColumnName("TiR_Descripcion");
        }
    }
}
