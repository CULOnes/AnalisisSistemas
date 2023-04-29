using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoadMaster.Repositories.Entities;

namespace RoadMaster.Repositories.Configurations
{
    public class CombustiblesConfiguration : IEntityTypeConfiguration<Combustibles>
    {
        public void Configure(EntityTypeBuilder<Combustibles> builder)
        {
            builder.ToTable("RoM_Combustible");
            builder.HasKey(x => x.Com_Codigo);

            builder.Property(x => x.Com_Codigo).HasColumnName("Com_Codigo");
            builder.Property(x => x.Com_TipoCombustible).HasColumnName("Com_TipoCombustible");
            builder.Property(x => x.Com_Marca).HasColumnName("Com_Marca");
        }
    }
}
