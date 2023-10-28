using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoadMaster.Repositories.Entities;

namespace RoadMaster.Repositories.Configurations
{
    public class CustodiosConfiguration : IEntityTypeConfiguration<Custodios>
    {
        public void Configure(EntityTypeBuilder<Custodios> builder)
        {
            builder.ToTable("AcF_Custodios");
            builder.HasKey(x => x.Cus_Codigo);

            builder.Property(x => x.Cus_Codigo).HasColumnName("Cus_Codigo");
            builder.Property(x => x.Suc_Codigo).HasColumnName("Suc_Codigo");
            builder.Property(x => x.Dep_Codigo).HasColumnName("Dep_Codigo");
            builder.Property(x => x.Cus_DPI).HasColumnName("Cus_DPI");
            builder.Property(x => x.Cus_Nombre).HasColumnName("Cus_Nombre");
            builder.Property(x => x.Cus_Apellido).HasColumnName("Cus_Apellido");
            builder.Property(x => x.Cus_Cargo).HasColumnName("Cus_Cargo");
        }
    }
}
