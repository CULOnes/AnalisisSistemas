using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoadMaster.Repositories.Entities;

namespace RoadMaster.Repositories.Configurations
{
    public class SegurosConfiguration : IEntityTypeConfiguration<Seguros>
    {
        public void Configure(EntityTypeBuilder<Seguros> builder)
        {
            builder.ToTable("RoM_Seguros");
            builder.HasKey(x => x.Seg_Codigo);

            builder.Property(x => x.Seg_Codigo).HasColumnName("Seg_Codigo");
            builder.Property(x => x.TiS_Codigo).HasColumnName("TiS_Codigo");
            builder.Property(x => x.Seg_Compañia).HasColumnName("Seg_Compañia");
            builder.Property(x => x.Seg_Cobertura).HasColumnName("Seg_Cobertura");
            builder.Property(x => x.Seg_Telefono).HasColumnName("Seg_Telefono");
            builder.Property(x => x.Seg_Vigencia).HasColumnName("Seg_Vigencia");
        }
    }
}
