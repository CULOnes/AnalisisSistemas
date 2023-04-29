using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoadMaster.Repositories.Entities;

namespace RoadMaster.Repositories.Configurations
{
    public class TiposSegurosConfiguration : IEntityTypeConfiguration<TiposSeguros>
    {
        public void Configure(EntityTypeBuilder<TiposSeguros> builder)
        {
            builder.ToTable("RoM_TipoSeguros");
            builder.HasKey(x => x.TiS_Codigo);

            builder.Property(x => x.TiS_Codigo).HasColumnName("TiS_Codigo");
            builder.Property(x => x.TiS_Nombre).HasColumnName("TiS_Nombre");
            builder.Property(x => x.TiS_Descripcion).HasColumnName("TiS_Descripcion");
        }
    }
}
