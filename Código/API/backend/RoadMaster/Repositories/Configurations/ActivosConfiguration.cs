using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoadMaster.Repositories.Entities;

namespace RoadMaster.Repositories.Configurations
{
    public class ActivosConfiguration : IEntityTypeConfiguration<Activos>
    {
        public void Configure(EntityTypeBuilder<Activos> builder)
        {
            builder.ToTable("AcF_Activos");
            builder.HasKey(x => x.Act_Codigo);

            builder.Property(x => x.Act_Codigo).HasColumnName("Act_Codigo");
            builder.Property(x => x.CoA_Codigo).HasColumnName("CoA_Codigo");
            builder.Property(x => x.Est_Codigo).HasColumnName("Est_Codigo");
            builder.Property(x => x.Cus_Codigo).HasColumnName("Cus_Codigo");
            builder.Property(x => x.Mar_Codigo).HasColumnName("Mar_Codigo");
            builder.Property(x => x.Cue_Codigo).HasColumnName("Cue_Codigo");
            builder.Property(x => x.UbF_Codigo).HasColumnName("UbF_Codigo");
            builder.Property(x => x.Act_Descripcion).HasColumnName("Act_Descripcion");
            builder.Property(x => x.Act_Modelo).HasColumnName("Act_Modelo");
            builder.Property(x => x.Act_Serie).HasColumnName("Act_Serie");
            builder.Property(x => x.Act_ValorInicial).HasColumnName("Act_ValorInicial");
            builder.Property(x => x.Act_Nombre).HasColumnName("Act_Nombre");
            builder.Property(x => x.Act_FechaIgreso).HasColumnName("Act_FechaIgreso");
            builder.Property(x => x.Act_Clase).HasColumnName("Act_Clase");
            builder.Property(x => x.Act_VidaUtil).HasColumnName("Act_VidaUtil");
            builder.Property(x => x.Act_InicioDepreciacion).HasColumnName("Act_InicioDepreciacion");
            builder.Property(x => x.Act_ValorDepreciacionAnual).HasColumnName("Act_ValorDepreciacionAnual");
            builder.Property(x => x.CeC_Codigo).HasColumnName("CeC_Codigo");
        }
    }
}
