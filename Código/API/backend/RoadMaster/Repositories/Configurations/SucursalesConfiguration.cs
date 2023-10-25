using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoadMaster.Repositories.Entities;

namespace RoadMaster.Repositories.Configurations
{
    public class SucursalesConfiguration : IEntityTypeConfiguration<Sucursales>
    {
        public void Configure(EntityTypeBuilder<Sucursales> builder)
        {
            builder.ToTable("AcF_Sucursales");
            builder.HasKey(x => x.Suc_Codigo);

            builder.Property(x => x.Suc_Codigo).HasColumnName("Suc_Codigo");
            builder.Property(x => x.Suc_Nombre).HasColumnName("Suc_Nombre");
        }
    }
}
