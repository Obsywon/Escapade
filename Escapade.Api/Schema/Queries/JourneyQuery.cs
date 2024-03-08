using Escapade.Api.Exceptions;
using Escapade.Api.Models;
using Escapade.Api.Services.Interfaces;

namespace Escapade.Api.Schema.Queries
{
    [ExtendObjectType(typeof(Query))]
    public class JourneyQuery
    {

        #region GetFromMe & GetFromUser

        ////[Authorize]
        //[Error(typeof(VerifyFirebaseTokenError))]
        //public async Task<ICollection<Journey>> GetAllJourneyFromMeAsync(IJourneyService service, IHttpContextAccessor httpContextAccessor, string userId, CancellationToken cancellation)
        //{
        //    //var userId = await Utils.VerifyFirebaseToken(httpContextAccessor);
        //    return (ICollection<Journey>)await service.GetAllJourneyByUserIdAsync(userId);
        //}   

        ////[Authorize]
        //[Error(typeof(VerifyFirebaseTokenError))]
        //public async Task<ICollection<Journey>> GetAllJourneyFromUserAsync(IJourneyService service, IHttpContextAccessor httpContextAccessor, string userId, CancellationToken cancellation)
        //{
        //    //await Utils.VerifyFirebaseToken(httpContextAccessor);
        //    return (ICollection<Journey>)await service.GetAllJourneyByUserIdAsync(userId);
        //}

        #endregion

        #region GetAll & GetById

        //[Authorize]
        [Error(typeof(VerifyFirebaseTokenError))]
        public async Task<ICollection<Journey>> GetAllJourneyAsync(IJourneyService service, IHttpContextAccessor httpContextAccessor, CancellationToken cancellation)
        {
            //await Utils.VerifyFirebaseToken(httpContextAccessor);
            return (ICollection<Journey>)await service.GetAllAsync();
        }

        //[Authorize]
        [Error(typeof(VerifyFirebaseTokenError))]
        public async Task<Journey> GetJourneyByIdAsync(IJourneyService service, IHttpContextAccessor httpContextAccessor, string journeyId, CancellationToken cancellation)
        {
            //await Utils.VerifyFirebaseToken(httpContextAccessor);
            return await service.GetByIdAsync(journeyId);
        }

        #endregion

        #region GetDefault & GetRandom

        //[Authorize]
        [Error(typeof(VerifyFirebaseTokenError))]
        public async Task<ICollection<Journey>> GetDefaultJourneyAsync(IJourneyService service, IHttpContextAccessor httpContextAccessor, CancellationToken cancellation)
        {
            //await Utils.VerifyFirebaseToken(httpContextAccessor);
            return (ICollection<Journey>)await service.GetByConditionAsync(j => j.Default == true);
        }

        //[Authorize]
        [Error(typeof(VerifyFirebaseTokenError))]
        public async Task<Journey> GetRandomJourneyAsync(IJourneyService service, IHttpContextAccessor httpContextAccessor, CancellationToken cancellation)
        {
            //await Utils.VerifyFirebaseToken(httpContextAccessor);
            return (Journey)await service.GetRandomJourneyAsync();
        }

        #endregion
    }
}
