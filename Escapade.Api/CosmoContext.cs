using Microsoft.EntityFrameworkCore;
using EscapadeApi.Models;
using System.Diagnostics;

namespace EscapadeApi
{
    public class CosmosContext : DbContext
    {

        public DbSet<User> Users { get; set; }
        public DbSet<Place> Places { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Favorite> Favorites { get; set; }
        public DbSet<Trajet> Trajets { get; set; }

        public CosmosContext(DbContextOptions<CosmosContext> options) : base(options)
        {
        }

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    IConfigurationRoot configuration = new ConfigurationBuilder()
        //    .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
        //    .AddJsonFile("appsettings.json")
        //    .Build();

        //    string accountEndpoint = configuration.GetValue<string>("CosmosDb:AccountEndpoint");
        //    string accountKey = configuration.GetValue<string>("CosmosDb:AccountKey");
        //    string databaseName = configuration.GetValue<string>("CosmosDb:DatabaseName");
        //    string connectionString = configuration.GetValue<string>("CosmosDb:ConnectionString");

        //    optionsBuilder.UseCosmos(
        //        connectionString,
        //        databaseName
        //    );
        //}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
            .HasMany(u => u.Favorites)
            .WithOne()
            .HasForeignKey(f => f.UserId);

            modelBuilder.Entity<Place>()
                .HasMany(p => p.Favorites)
                .WithOne()
                .HasForeignKey(f => f.PlaceId);

            modelBuilder.Entity<User>()
                .HasMany(u => u.Posts)
                .WithOne()
                .HasForeignKey(p => p.UserId);

            modelBuilder.Entity<Trajet>()
                .HasMany(t => t.Etapes)
                .WithOne()
                .HasForeignKey(e => e.TrajetId);

            // Appel à la méthode de base pour appliquer d'autres configurations du modèle.
            base.OnModelCreating(modelBuilder);
        }
    }
}
