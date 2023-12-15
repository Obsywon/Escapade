using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AzureFunctionEscapade.Models;

namespace AzureFunctionEscapade
{
    public class CosmosContext : DbContext
    {

        private readonly FunctionConfiguration _config;

        public DbSet<User> Users { get; set; }
        public DbSet<Post> Posts { get; set; }

        private CosmosContext(DbContextOptions<CosmosContext> options, FunctionConfiguration config): base(options)
        {
            _config = config;
        }

        public CosmosContext(DbContextOptions<CosmosContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<User>().ToContainer(nameof(User))
                .HasNoDiscriminator()
                .HasPartitionKey(e => e.Id);

            modelBuilder
                .Entity<Post>().ToContainer(nameof(Post))
                .HasNoDiscriminator()
                .HasPartitionKey(e => e.Id);
        }

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseCosmos(
        //        accountEndpoint: _config.CosmosAccountEndpoint,
        //        accountKey: _config.CosmosAccountKey,
        //        databaseName: _config.CosmosDatabaseName);
        //}
    }
}
