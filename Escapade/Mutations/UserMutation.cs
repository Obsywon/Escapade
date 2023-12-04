using AzureFunctionEscapade.Models;
using AzureFunctionEscapade.Queries.Interface;
using AzureFunctionEscapade.Queries;
using Microsoft.AspNetCore.JsonPatch;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using AzureFunctionEscapade.Mutations.Interface;
using AzureFunctionEscapade.Services.Interfaces;
using HotChocolate;
using AzureFunctionEscapade.Services;
using Microsoft.AspNetCore.Mvc;

namespace AzureFunctionEscapade.Mutations
{
    public class UserMutation : Mutation<User>, IUserMutation
    {
        public UserMutation(IService<User> service) : base(service) { }

        public async Task<User> CreateUser([Service] IHttpClientFactory clientFactory, User newUser, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public async Task DeleteUser([Service] IHttpClientFactory clientFactory, string userId, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public async Task<User> UpdateUserPost([Service] IHttpClientFactory clientFactory, string userId, User updatedUser, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
