using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoadMaster.Repositories.Entities;

namespace RoadMaster.Repositories.Configurations
{
    public class VehiculosConfiguration : IEntityTypeConfiguration<Vehiculos>
    {
        public void Configure(EntityTypeBuilder<Vehiculos> builder)
        {
            builder.ToTable("RoM_Vehiculos");
            builder.HasKey(x => x.Veh_Codigo);

            builder.Property(x => x.Veh_Codigo).HasColumnName("Veh_Codigo");
            builder.Property(x => x.TiV_Codigo).HasColumnName("TiV_Codigo");
            builder.Property(x => x.Com_Codigo).HasColumnName("Com_Codigo");
            builder.Property(x => x.Veh_Marca).HasColumnName("Veh_Marca");
            builder.Property(x => x.Veh_Placa).HasColumnName("Veh_Placa");
            builder.Property(x => x.Veh_Modelo).HasColumnName("Veh_Modelo");
            builder.Property(x => x.Veh_Año).HasColumnName("Veh_Año");
            builder.Property(x => x.Veh_KilometrajeInicial).HasColumnName("Veh_KilometrajeInicial");
            builder.Property(x => x.Veh_Color).HasColumnName("Veh_Color");
            builder.Property(x => x.Veh_Transmision).HasColumnName("Veh_Transmision");
        }
    }
}
