﻿using Microsoft.EntityFrameworkCore;
using EscapadeApi.Models;
using System.Diagnostics;
using Escapade.Api.Models;

namespace Escapade.Api
{
    public class CosmosContext : DbContext
    {

        public DbSet<User> Users { get; set; }
        public DbSet<Place> Places { get; set; }
        public DbSet<Journey> Journeys { get; set; }

        public CosmosContext(DbContextOptions<CosmosContext> options) : base(options)
        {
            //Database.EnsureDeleted();
            //Database.EnsureCreated();
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .ToContainer("Users")
                .HasPartitionKey(e => e.Id);

            modelBuilder.Entity<Place>()
                .ToContainer("Places")
                .HasPartitionKey(e => e.Id);

            modelBuilder.Entity<PlaceAddedByUser>()
                .ToContainer("Places")  
                .HasPartitionKey(e => e.Id);

            modelBuilder.Entity<Journey>()
               .ToContainer("Journeys")
               .HasPartitionKey(e => e.Id);


            modelBuilder.Entity<User>().OwnsMany(u => u.FavoritePlaces);
            modelBuilder.Entity<User>().OwnsMany(u => u.Posts);
            modelBuilder.Entity<User>()
                .HasMany(u => u.PlacesAddedByUser)
                .WithOne()
                .HasForeignKey(fp => fp.UserId);

            modelBuilder.Entity<Place>().OwnsOne(p => p.GeographicCoordinate);

            // Appel à la méthode de base pour appliquer d'autres configurations du modèle.
            base.OnModelCreating(modelBuilder);
        }
    }
}
