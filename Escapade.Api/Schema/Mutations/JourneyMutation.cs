using Escapade.Api.Exceptions;
using Escapade.Api.Models;
using Escapade.Api.Services.Interfaces;
using HotChocolate.Authorization;

namespace Escapade.Api.Schema.Mutations
{
    [ExtendObjectType(typeof(Mutation))]
    public class JourneyMutation
    {
        [Authorize]
        [Error(typeof(VerifyFirebaseTokenError))]
        public async Task<Journey> UpdateJourneyAsync(IJourneyService service, IHttpContextAccessor httpContextAccessor, string journeyId, Place departurePlace, Place arrivalPlace, ICollection<Place> placesToCross, CancellationToken cancellationToken)
        {
            await Utils.VerifyFirebaseToken(httpContextAccessor);

            Journey journey = null;

            if (!await service.IsFoundAsync(journeyId))
                throw new Exception();

            journey = await service.GetByIdAsync(journeyId);

            journey.DeparturePlace = departurePlace;
            journey.ArrivalPlace = arrivalPlace;
            journey.PlacesToCross = placesToCross;

            return await service.UpdateAsync(journey);
        }

        [Authorize]
        [Error(typeof(VerifyFirebaseTokenError))]
        public async Task<Journey> CreateJourneyAsync(IJourneyService service, IHttpContextAccessor httpContextAccessor, Place departurePlace, Place arrivalPlace, ICollection<Place> placesToCross, CancellationToken cancellationToken)
        {
            await Utils.VerifyFirebaseToken(httpContextAccessor);

            Journey journey = new Journey
            {
                DeparturePlace = departurePlace,
                PlacesToCross = placesToCross,
                ArrivalPlace = arrivalPlace,
            };

            return await service.CreateAsync(journey);
        }

        [Authorize]
        [Error(typeof(VerifyFirebaseTokenError))]
        public async Task DeleteJourneyAsync(IJourneyService service, IHttpContextAccessor httpContextAccessor, string journeyId, CancellationToken cancellationToken)
        {
            await Utils.VerifyFirebaseToken(httpContextAccessor);

            Journey journey = null;

            if (!await service.IsFoundAsync(journeyId))
                throw new Exception();

            await service.DeleteAsync(journeyId);
        }

    }
}