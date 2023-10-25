using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoadMaster.Repositories.Entities;

namespace RoadMaster.Repositories.Configurations
{
    public class EstadosConfiguration : IEntityTypeConfiguration<Estados>
    {
        public void Configure(EntityTypeBuilder<Estados> builder)
        {
            builder.ToTable("AcF_Estado");
            builder.HasKey(x => x.Est_Codigo);

            builder.Property(x => x.Est_Codigo).HasColumnName("Est_Codigo");
            builder.Property(x => x.Est_Nombre).HasColumnName("Est_Nombre");
            builder.Property(x => x.Est_Descripcion).HasColumnName("Est_Descripcion");
            builder.Property(x => x.Est_Baja).HasColumnName("Est_Baja");
        }
    }
}
