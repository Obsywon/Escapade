using EscapadeApi.Queries.Interface;
using EscapadeApi.Queries;
using HotChocolate;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using EscapadeApi.Models;
using Microsoft.AspNetCore.Mvc;
using HotChocolate.Authorization;
using EscapadeApi.Services;
using EscapadeApi.Services.Interfaces;

namespace EscapadeApi.Mutations.Interface
{
    public interface IUserMutation : IMutation<User>
    {
        #region API Rest
        public Task<User> CreateUserRestApi(IHttpClientFactory clientFactory, User newUser, CancellationToken cancellationToken);

        public Task<User> UpdateUserRestApi(IHttpClientFactory clientFactory, string userId, User updatedUser, CancellationToken cancellationToken);

        public Task DeleteUserRestApi(IHttpClientFactory clientFactory, string userId, CancellationToken cancellationToken);
        #endregion

        #region HotChocolate
        [AllowAnonymous]
        public Task<User> RegisterUser(IUserService userService, string name, string lastname, string email, string password, DateTime birthDate, CancellationToken cancellationToken);
        #endregion
    }
}
