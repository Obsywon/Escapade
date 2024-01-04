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

namespace EscapadeApi.Mutations.Interface
{
    public interface IUserMutation : IMutation<User>
    {
        public Task<User> CreateUser([Service] IHttpClientFactory clientFactory, User newUser, CancellationToken cancellationToken);

        public Task<User> UpdateUserPost([Service] IHttpClientFactory clientFactory, string userId, User updatedUser, CancellationToken cancellationToken);

        public Task DeleteUser([Service] IHttpClientFactory clientFactory, string userId, CancellationToken cancellationToken);

    }
}
