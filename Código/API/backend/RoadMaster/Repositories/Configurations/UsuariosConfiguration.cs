using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoadMaster.Repositories.Entities;

namespace RoadMaster.Repositories.Configurations
{
    public class UsuariosConfiguration : IEntityTypeConfiguration<Usuarios>
    {
        public void Configure(EntityTypeBuilder<Usuarios> builder)
        {
            builder.ToTable("AcF_Usuarios");
            builder.HasKey(x => x.Usu_Codigo);

            builder.Property(x => x.Usu_Codigo).HasColumnName("Usu_Codigo");
            builder.Property(x => x.Usu_NombreUsuario).HasColumnName("Usu_NombreUsuario");
            builder.Property(x => x.Usu_Nombre).HasColumnName("Usu_Nombre");
            builder.Property(x => x.Usu_Apellido).HasColumnName("Usu_Apellido");
            builder.Property(x => x.Usu_Clave).HasColumnName("Usu_Clave");
        }
    }
}
