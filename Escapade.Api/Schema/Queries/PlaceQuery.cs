using Escapade.Api.Exceptions;
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
        public PlaceQuery() : base() { }

        [Authorize]
        [Error(typeof(VerifyFirebaseTokenException))]
        public async Task<IEnumerable<Place>> GetAllPlaceAsync(IPlaceService service, IHttpContextAccessor httpContextAccessor, CancellationToken cancellation)
        {
            await Utils.VerifyFirebaseToken(httpContextAccessor);
            return await service.GetAllAsync();
        }

        [Authorize]
        [Error(typeof(VerifyFirebaseTokenException))]
        [Error(typeof(NotFoundException))]
        public async Task<Place> GetPlaceByIdAsync(IPlaceService service, IHttpContextAccessor httpContextAccessor, string id, CancellationToken cancellation)
        {
            await Utils.VerifyFirebaseToken(httpContextAccessor);
            return await service.GetByIdAsync(id);
        }

        [Authorize]
        [Error(typeof(VerifyFirebaseTokenException))]
        [Error(typeof(NotFoundException))]
        public async Task<ICollection<PlaceAddedByUser>> GetAllPlaceAddedByAUserAsync(IPlaceService service, IHttpContextAccessor httpContextAccessor, string userId, CancellationToken cancellation)
        {
            await Utils.VerifyFirebaseToken(httpContextAccessor);
            return await service.GetAllPlaceAddedByAUser(userId);
        }

        [Authorize]
        [Error(typeof(VerifyFirebaseTokenException))]
        [Error(typeof(NotFoundException))]
        public async Task<ICollection<PlaceAddedByUser>> GetAllPlaceAddedByThisUserAsync(IPlaceService service, IHttpContextAccessor httpContextAccessor, CancellationToken cancellation)
        {
            var userId = await Utils.VerifyFirebaseToken(httpContextAccessor);
            return await service.GetAllPlaceAddedByAUser(userId);
        }

        [Authorize]
        [Error(typeof(VerifyFirebaseTokenException))]
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
