using EscapadeApi.Models;
using EscapadeApi.Queries.Interface;
using EscapadeApi.Queries;
using Microsoft.AspNetCore.JsonPatch;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using EscapadeApi.Mutations.Interface;
using EscapadeApi.Services.Interfaces;
using HotChocolate;
using EscapadeApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace EscapadeApi.Mutations
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
