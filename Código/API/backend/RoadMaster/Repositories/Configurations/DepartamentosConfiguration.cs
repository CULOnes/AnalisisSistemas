using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoadMaster.Repositories.Entities;

namespace RoadMaster.Repositories.Configurations
{
    public class DepartamentosConfiguration : IEntityTypeConfiguration<Departamentos>
    {
        public void Configure(EntityTypeBuilder<Departamentos> builder)
        {
            builder.ToTable("AcF_Departamentos");
            builder.HasKey(x => x.Dep_Codigo);

            builder.Property(x => x.Dep_Codigo).HasColumnName("Dep_Codigo");
            builder.Property(x => x.Dep_Nombre).HasColumnName("Dep_Nombre");
            builder.Property(x => x.Dep_Descripcion).HasColumnName("Dep_Descripcion");
            builder.Property(x => x.Dep_Jefe).HasColumnName("Dep_Jefe");
        }
    }
}
