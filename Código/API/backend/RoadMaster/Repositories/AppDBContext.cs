using Microsoft.EntityFrameworkCore;
using RoadMaster.Repositories.Entities;
using System.Reflection;

namespace RoadMaster.Repositories
{
    public class AppDBContext: DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options) { }

        public DbSet<Usuarios> Usuarios { get; set; }
        public DbSet<Clientes> Clientes { get; set; }
        public DbSet<TiposVehiculos> TiposVehiculos { get; set; }
        public DbSet<Vehiculos> Vehiculos { get; set; }
        public DbSet<Combustibles> Combustibles { get; set; }
        public DbSet<Inspecciones> Inspecciones { get; set; }
        public DbSet<TiposSeguros> TiposSeguros { get; set; }
        public DbSet<TiposReparaciones> TiposReparaciones { get; set; }
        public DbSet<Seguros> Seguros { get; set; }
        public DbSet<Mantenimientos> Mantenimientos { get; set; }
        public DbSet<Asignaciones> Asignaciones { get; set; }
        public DbSet<Empleados> Empleados { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
            base.OnModelCreating(modelBuilder);
        }
    }
}
