﻿using Escapade.Api.Services.Interfaces;
using EscapadeApi.Services.Interfaces;
using HotChocolate.Authorization;
using System.Security.Claims;

namespace Escapade.Api.Schema.Queries
{
    [ExtendObjectType(typeof(Query))]
    public class PlaceQuery
    {
        public PlaceQuery() : base() { }

        [Authorize]
        public async Task<IEnumerable<Place>> GetAllPlaceAsync(IPlaceService service, CancellationToken cancellation)
        {
            return await service.GetAllAsync();
        }

        [Authorize]
        public async Task<Place> GetPlaceByIdAsync(IPlaceService service, string id, CancellationToken cancellation)
        {
            return await service.GetByIdAsync(id);
        }

        [Authorize]
        public async Task<ICollection<PlaceAddedByUser>> GetAllPlaceAddedByUserAsync(IPlaceService service, string userId, CancellationToken cancellation)
        {
            return await service.GetAllPlaceAddedByUser(userId);
        }

        [Authorize]
        public async Task<ICollection<PlaceAddedByUser>> GetAllPlaceAddedByAllUserAsync(IPlaceService service, CancellationToken cancellation)
        {
            // Récupérer toutes les places
            var allPlaces = await service.GetAllAsync();

            // Filtrer uniquement les PlaceAddedByUser
            var placesAddedByUsers = allPlaces.OfType<PlaceAddedByUser>().ToList();

            return placesAddedByUsers;
        }
    }
}