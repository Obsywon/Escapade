using Escapade.Api.Exceptions;
using Escapade.Api.Models;
using Escapade.Api.Services.Interfaces;

namespace Escapade.Api.Schema.Mutations
{
    [ExtendObjectType(typeof(Mutation))]
    public class PlaceMutation
    {
        //[Authorize]
        [Error(typeof(VerifyFirebaseTokenError))]
        public async Task<Place> UpdatePlaceAsync(IPlaceService service, IHttpContextAccessor httpContextAccessor,string placeId, string name, string description, double latitude, double longitude, CancellationToken cancellationToken)
        {
            //await Utils.VerifyFirebaseToken(httpContextAccessor);

            Place place = null;

            if (!await service.IsFoundAsync(placeId))
                throw new Exception();

            place = await service.GetByIdAsync(placeId);

            place.Name = name;
            place.Description = description;
            place.Coordinate.Latitude = latitude;
            place.Coordinate.Longitude = longitude;

            return await service.UpdateAsync(place);
        }

        //[Authorize]
        [Error(typeof(VerifyFirebaseTokenError))]
        public async Task<Place> CreatePlaceAsync(IPlaceService service, IHttpContextAccessor httpContextAccessor, string name, string description, double latitude, double longitude, CancellationToken cancellationToken)
        {
            //await Utils.VerifyFirebaseToken(httpContextAccessor);

            Place place = new Place
            {
                Name = name,
                Description = description,
            };

            GeographicCoordinate geographicCoordinate = new GeographicCoordinate
            {
                Latitude = latitude,
                Longitude = longitude,
            };

            place.Coordinate = geographicCoordinate;

            return await service.CreateAsync(place);
        }

        //[Authorize]
        [Error(typeof(VerifyFirebaseTokenError))]
        public async Task DeletePlaceAsync(IPlaceService service, IHttpContextAccessor httpContextAccessor, string placeId, CancellationToken cancellationToken)
        {
            //await Utils.VerifyFirebaseToken(httpContextAccessor);

            Place place = null;

            if (!await service.IsFoundAsync(placeId))
                throw new Exception();

            await service.DeleteAsync(placeId);
        }
    }
}
