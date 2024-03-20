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
        public async Task<ICollection<Place>> GetAllPlaceAddedByUserAsync(IPlaceService service, IHttpContextAccessor httpContextAccessor, string userId, CancellationToken cancellation)
        {
            await Utils.VerifyFirebaseToken(httpContextAccessor);
            return await service.GetAllPlaceAddedByUser(userId);
        }

        [Authorize]
        [Error(typeof(VerifyFirebaseTokenError))]
        public async Task<ICollection<Place>> GetAllPlaceAddedByMeAsync(IPlaceService service, IHttpContextAccessor httpContextAccessor, CancellationToken cancellation)
        {
            var userId = await Utils.VerifyFirebaseToken(httpContextAccessor);
            return await service.GetAllPlaceAddedByUser(userId);
        }    
    }
}
