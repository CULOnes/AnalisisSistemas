using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoadMaster.Repositories.Entities;

namespace RoadMaster.Repositories.Configurations
{
    public class CuentasConfiguration : IEntityTypeConfiguration<Cuentas>
    {
        public void Configure(EntityTypeBuilder<Cuentas> builder)
        {
            builder.ToTable("AcF_Cuentas");
            builder.HasKey(x => x.Cue_Codigo);

            builder.Property(x => x.Cue_Codigo).HasColumnName("Cue_Codigo");
            builder.Property(x => x.Cue_Nombre).HasColumnName("Cue_Nombre");
            builder.Property(x => x.Cue_Descripcion).HasColumnName("Cue_Descripcion");
            builder.Property(x => x.Cue_Tipo).HasColumnName("Cue_Tipo");
        }
    }
}
