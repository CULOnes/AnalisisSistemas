using Microsoft.EntityFrameworkCore;
using RoadMaster.Repositories.Entities;
using System.Reflection;

namespace RoadMaster.Repositories
{
    public class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options) { }

        public DbSet<Usuarios> Usuarios { get; set; }
        public DbSet<Marcas> Marcas { get; set; }
        public DbSet<Estados> Estados { get; set; }
        public DbSet<Sucursales> Sucursales { get; set; }
        public DbSet<UbicacionesFisicas> UbicacionesFisicas { get; set; }
        public DbSet<Departamentos> Departamentos { get; set; }
        public DbSet<Cuentas> Cuentas { get; set; }
        public DbSet<Custodios> Custodios { get; set; }
        public DbSet<CentrosCosto> CentrosCosto { get; set; }
        public DbSet<Activos> Activos { get; set; }

        public DbSet<Clientes> Clientes { get; set; }
        public DbSet<TiposVehiculos> TiposVehiculos { get; set; }
        public DbSet<Combustibles> Combustibles { get; set; }
        public DbSet<Inspecciones> Inspecciones { get; set; }
        public DbSet<TiposSeguros> TiposSeguros { get; set; }
        public DbSet<TiposReparaciones> TiposReparaciones { get; set; }
        public DbSet<Seguros> Seguros { get; set; }
        public DbSet<Mantenimientos> Mantenimientos { get; set; }
        public DbSet<Asignaciones> Asignaciones { get; set; }
        public DbSet<Empleados> Empleados { get; set; }
        public DbSet<Puestos> Puestos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
            base.OnModelCreating(modelBuilder);
        }
    }
}
