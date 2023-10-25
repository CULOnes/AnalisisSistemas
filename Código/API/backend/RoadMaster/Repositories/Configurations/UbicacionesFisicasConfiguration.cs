using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoadMaster.Repositories.Entities;

namespace RoadMaster.Repositories.Configurations
{
    public class UbicacionesFisicasConfiguration : IEntityTypeConfiguration<UbicacionesFisicas>
    {
        public void Configure(EntityTypeBuilder<UbicacionesFisicas> builder)
        {
            builder.ToTable("AcF_UbicacionesFisicas");
            builder.HasKey(x => x.UbF_Codigo);

            builder.Property(x => x.UbF_Codigo).HasColumnName("UbF_Codigo");
            builder.Property(x => x.UbF_Ubicacion).HasColumnName("UbF_Ubicacion");
            builder.Property(x => x.UbF_Descripcion).HasColumnName("UbF_Descripcion");
        }
    }
}
