using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoadMaster.Repositories.Entities;

namespace RoadMaster.Repositories.Configurations
{
    public class TiposVehiculosConfiguration : IEntityTypeConfiguration<TiposVehiculos>
    {
        public void Configure(EntityTypeBuilder<TiposVehiculos> builder)
        {
            builder.ToTable("RoM_TipoVehiculo");
            builder.HasKey(x => x.TiV_Codigo);

            builder.Property(x => x.TiV_Codigo).HasColumnName("TiV_Codigo");
            builder.Property(x => x.TiV_Nombre).HasColumnName("TiV_Nombre");
            builder.Property(x => x.TiV_Capacidad).HasColumnName("TiV_Capacidad");
            builder.Property(x => x.TiV_Tonelaje).HasColumnName("TiV_Tonelaje");
            builder.Property(x => x.TiV_Descripcion).HasColumnName("TiV_Descripcion");
        }
    }
}
