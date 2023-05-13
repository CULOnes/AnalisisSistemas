using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RoadMaster.Repositories.Entities;

namespace RoadMaster.Repositories.Configurations
{
    public class InspeccionesConfiguration : IEntityTypeConfiguration<Inspecciones>
    {
        public void Configure(EntityTypeBuilder<Inspecciones> builder)
        {
            builder.ToTable("RoM_Inspecciones");
            builder.HasKey(x => x.Ins_Codigo);

            builder.Property(x => x.Ins_Codigo).HasColumnName("Ins_Codigo");
            builder.Property(x => x.Usu_Codigo).HasColumnName("Usu_Codigo");
            builder.Property(x => x.Veh_Codigo).HasColumnName("Veh_Codigo");
            builder.Property(x => x.Ins_KilometrajeActual).HasColumnName("Ins_KilometrajeActual");
            builder.Property(x => x.Ins_Aprobacion).HasColumnName("Ins_Aprobacion");
            builder.Property(x => x.Ins_Estado).HasColumnName("Ins_Estado");
            builder.Property(x => x.Ins_Fecha).HasColumnName("Ins_Fecha");
            builder.Property(x => x.Ins_Descripcion).HasColumnName("Ins_Descripcion");
        }
    }
}
