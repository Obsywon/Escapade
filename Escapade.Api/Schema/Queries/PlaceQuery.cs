using Escapade.Api.Exceptions;
using Escapade.Api.Models;
using Escapade.Api.Services.Interfaces;
using HotChocolate.Authorization;

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
        public async Task<Place> GetPlaceByIdAsync(IPlaceService service, IHttpContextAccessor httpContextAccessor, string placeId, CancellationToken cancellation)
        {
            await Utils.VerifyFirebaseToken(httpContextAccessor);
            return await service.GetByIdAsync(placeId);
        }

        [Authorize]
        [Error(typeof(VerifyFirebaseTokenError))]
        public async Task<ICollection<PlaceAddedByUser>> GetAllPlaceAddedByUserAsync(IPlaceService service, IHttpContextAccessor httpContextAccessor, string userId, CancellationToken cancellation)
        {
            await Utils.VerifyFirebaseToken(httpContextAccessor);
            return await service.GetAllPlaceAddedByUser(userId);
        }

        [Authorize]
        [Error(typeof(VerifyFirebaseTokenError))]
        public async Task<ICollection<PlaceAddedByUser>> GetAllPlaceAddedByMeAsync(IPlaceService service, IHttpContextAccessor httpContextAccessor, CancellationToken cancellation)
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
