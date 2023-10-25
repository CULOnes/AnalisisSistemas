using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoadMaster.Repositories.Entities;

namespace RoadMaster.Repositories.Configurations
{
    public class MarcasConfiguration : IEntityTypeConfiguration<Marcas>
    {
        public void Configure(EntityTypeBuilder<Marcas> builder)
        {
            builder.ToTable("AcF_Marcas");
            builder.HasKey(x => x.Mar_Codigo);

            builder.Property(x => x.Mar_Codigo).HasColumnName("Mar_Codigo");
            builder.Property(x => x.Mar_Nombre).HasColumnName("Mar_Nombre");
            builder.Property(x => x.Mar_Descripcion).HasColumnName("Mar_Descripcion");
        }
    }
}
