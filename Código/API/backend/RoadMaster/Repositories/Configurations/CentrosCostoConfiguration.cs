using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoadMaster.Repositories.Entities;

namespace RoadMaster.Repositories.Configurations
{
    public class CentrosCostoConfiguration : IEntityTypeConfiguration<CentrosCosto>
    {
        public void Configure(EntityTypeBuilder<CentrosCosto> builder)
        {
            builder.ToTable("AcF_CentroCostos");
            builder.HasKey(x => x.CeC_Codigo);

            builder.Property(x => x.CeC_Codigo).HasColumnName("CeC_Codigo");
            builder.Property(x => x.Cue_Codigo).HasColumnName("Cue_Codigo");
            builder.Property(x => x.CeC_Nombre).HasColumnName("CeC_Nombre");
            builder.Property(x => x.CeC_Descripcion).HasColumnName("CeC_Descripcion");
        }
    }
}
