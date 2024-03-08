using Escapade.Api.Exceptions;
using Escapade.Api.Models;
using Escapade.Api.Services.Interfaces;
using EscapadeApi.Services.Interfaces;
using HotChocolate.Authorization;

namespace Escapade.Api.Schema.Queries
{
    [ExtendObjectType(typeof(Query))]
    public class PostQuery
    {
        #region GetFromMe & GetFromUser

        //[Authorize]
        [Error(typeof(VerifyFirebaseTokenError))]
        public async Task<ICollection<Post>> GetAllPostByMeAsync(IJourneyService service, IHttpContextAccessor httpContextAccessor, string userId, CancellationToken cancellation)
        {
            //var userId = await Utils.VerifyFirebaseToken(httpContextAccessor);
            return (ICollection<Journey>)await service.GetAllJourneyByUserIdAsync(userId);
        }

        //[Authorize]
        [Error(typeof(VerifyFirebaseTokenError))]
        public async Task<ICollection<Journey>> GetAllJourneyByUserAsync(IJourneyService service, IHttpContextAccessor httpContextAccessor, string userId, CancellationToken cancellation)
        {
            //await Utils.VerifyFirebaseToken(httpContextAccessor);
            return (ICollection<Journey>)await service.GetAllJourneyByUserIdAsync(userId);
        }

        #endregion

        #region GetAll & GetById

        //[Authorize]
        [Error(typeof(VerifyFirebaseTokenError))]
        public async Task<ICollection<Journey>> GetAllJourneyAsync(IJourneyService service, IHttpContextAccessor httpContextAccessor, CancellationToken cancellation)
        {
            //await Utils.VerifyFirebaseToken(httpContextAccessor);
            return (ICollection<Journey>)await service.GetAllAsync();
        }

        [Authorize]
        [Error(typeof(VerifyFirebaseTokenError))]
        public async Task<Journey> GetJourneyByIdAsync(IJourneyService service, IHttpContextAccessor httpContextAccessor, string journeyId, CancellationToken cancellation)
        {
            //await Utils.VerifyFirebaseToken(httpContextAccessor);
            return await service.GetByIdAsync(journeyId);
        }

        #endregion

        #region GetRandom

        //[Authorize]
        [Error(typeof(VerifyFirebaseTokenError))]
        public async Task<ICollection<Post>> GetRandomPostAsync(IUserService service, IHttpContextAccessor httpContextAccessor, CancellationToken cancellation)
        {
            //await Utils.VerifyFirebaseToken(httpContextAccessor);
            return await service.GetRandomPostAsync();
        }

        #endregion
    }
}
