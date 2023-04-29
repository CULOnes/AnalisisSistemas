using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoadMaster.Repositories.Entities;

namespace RoadMaster.Repositories.Configurations
{
    public class ClientesConfiguration : IEntityTypeConfiguration<Clientes>
    {
        public void Configure(EntityTypeBuilder<Clientes> builder)
        {
            builder.ToTable("RoM_Clientes");
            builder.HasKey(x => x.Cli_Codigo);

            builder.Property(x => x.Cli_Codigo).HasColumnName("Cli_Codigo");
            builder.Property(x => x.Cli_Nombre).HasColumnName("Cli_Nombre");
            builder.Property(x => x.Cli_Apellido).HasColumnName("Cli_Apellido");
            builder.Property(x => x.Cli_Correo).HasColumnName("Cli_Correo");
            builder.Property(x => x.Cli_TelefonoCelular).HasColumnName("Cli_TelefonoCelular");
            builder.Property(x => x.Cli_TelefonoSecundario).HasColumnName("Cli_TelefonoSecundario");
        }
    }
}
