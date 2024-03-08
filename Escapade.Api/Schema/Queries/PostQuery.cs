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
        public async Task<ICollection<Post>> GetAllPostByMeAsync(IUserService service, IHttpContextAccessor httpContextAccessor, string userId, CancellationToken cancellation)
        {
            //var userId = await Utils.VerifyFirebaseToken(httpContextAccessor);
            return (ICollection<Post>)await service.GetAllPostByUserAsync(userId);
        }

        //[Authorize]
        [Error(typeof(VerifyFirebaseTokenError))]
        public async Task<ICollection<Post>> GetAllPostByUserAsync(IUserService service, IHttpContextAccessor httpContextAccessor, string userId, CancellationToken cancellation)
        {
            //await Utils.VerifyFirebaseToken(httpContextAccessor);
            return (ICollection<Post>)await service.GetAllPostByUserAsync(userId);
        }

        #endregion

        #region GetAll & GetById

        //[Authorize]
        [Error(typeof(VerifyFirebaseTokenError))]
        public async Task<ICollection<Post>> GetAllPostAsync(IUserService service, IHttpContextAccessor httpContextAccessor, CancellationToken cancellation)
        {
            //await Utils.VerifyFirebaseToken(httpContextAccessor);
            return (ICollection<Post>)await service.GetAllPostAsync();
        }

        ////[Authorize]
        //[Error(typeof(VerifyFirebaseTokenError))]
        //public async Task<Post> GetPostByIdAsync(IUserService service, IHttpContextAccessor httpContextAccessor, string postId, CancellationToken cancellation)
        //{
        //    //await Utils.VerifyFirebaseToken(httpContextAccessor);
        //    return await service.GetPostByIdAsync(postId);
        //}

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
