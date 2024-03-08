using Escapade.Api.Exceptions;
using Escapade.Api.Models;
using Escapade.Api.Services.Interfaces;
using EscapadeApi.Services.Interfaces;
using HotChocolate.Authorization;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace Escapade.Api.Schema.Queries
{
    [ExtendObjectType(typeof(Query))]
    public class PlaceQuery
    {

        [Authorize]
        [Error(typeof(VerifyFirebaseTokenError))]
        public async Task<IEnumerable<Place>> GetAllPlaceAsync(IPlaceService service, IHttpContextAccessor httpContextAccessor, CancellationToken cancellation)
        {
            await Utils.VerifyFirebaseToken(httpContextAccessor);
            return await service.GetAllAsync();
        }

        [Authorize]
        [Error(typeof(VerifyFirebaseTokenError))]
        public async Task<Place> GetPlaceByIdAsync(IPlaceService service, IHttpContextAccessor httpContextAccessor, string id, CancellationToken cancellation)
        {
            await Utils.VerifyFirebaseToken(httpContextAccessor);
            return await service.GetByIdAsync(id);
        }

        [Authorize]
        [Error(typeof(VerifyFirebaseTokenError))]
        public async Task<ICollection<PlaceAddedByUser>> GetAllPlaceAddedByOtherUserAsync(IPlaceService service, IHttpContextAccessor httpContextAccessor, string userId, CancellationToken cancellation)
        {
            await Utils.VerifyFirebaseToken(httpContextAccessor);
            return await service.GetAllPlaceAddedByUser(userId);
        }

        [Authorize]
        [Error(typeof(VerifyFirebaseTokenError))]
        public async Task<ICollection<PlaceAddedByUser>> GetAllPlaceAddedByThisUserAsync(IPlaceService service, IHttpContextAccessor httpContextAccessor, CancellationToken cancellation)
        {
            var userId = await Utils.VerifyFirebaseToken(httpContextAccessor);
            return await service.GetAllPlaceAddedByUser(userId);
        }

        [Authorize]
        [Error(typeof(VerifyFirebaseTokenError))]
        public async Task<ICollection<PlaceAddedByUser>> GetAllPlaceAddedByAllUserAsync(IPlaceService service, IHttpContextAccessor httpContextAccessor, CancellationToken cancellation)
        {
            await Utils.VerifyFirebaseToken(httpContextAccessor);

            // Récupérer toutes les places
            var allPlaces = await service.GetAllAsync();

            // Filtrer uniquement les PlaceAddedByUser
            var placesAddedByUsers = allPlaces.OfType<PlaceAddedByUser>().ToList();

            return placesAddedByUsers;
        }
    }
}
