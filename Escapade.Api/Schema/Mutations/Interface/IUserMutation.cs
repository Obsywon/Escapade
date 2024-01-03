using EscapadeApi.Services.Interfaces;
using HotChocolate.Authorization;
using EscapadeApi.Models;

namespace Escapade.Api.Schema.Mutations.Interface
{
    public interface IUserMutation : IMutation<User>
    {
        #region API Rest
        public Task<User> CreateUserRestApi(IHttpClientFactory clientFactory, User newUser, CancellationToken cancellationToken);

        public Task<User> UpdateUserRestApi(IHttpClientFactory clientFactory, Guid userId, User updatedUser, CancellationToken cancellationToken);

        public Task DeleteUserRestApi(IHttpClientFactory clientFactory, Guid userId, CancellationToken cancellationToken);
        #endregion

        #region HotChocolate
        [AllowAnonymous]
        public Task<User> RegisterUser(IUserService userService, string name, string lastname, string email, string password, DateTime birthDate, CancellationToken cancellationToken);
        #endregion
    }
}
