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
using AzureFunctionEscapade.Models.Interfaces;

namespace AzureFunctionEscapade.Mutations
{
    public class UserMutation : Mutation<User>, IUserMutation
    {
        protected readonly IUserService _userService;
        public UserMutation(IService<User> service, IUserService userService) : base(service) { this._userService = userService; }

        public async override Task<User> Create(User entity)
        {
            if (!await this._userService.CheckForConflictingUser(entity))
            {
                entity.Password = await this._userService.EncryptPassword(entity);
                return await this._service.Create(entity);
            } else
            {
                throw new InvalidOperationException("Email address is already in use.");
            }
        }

        public async Task<User> CreateUser([Service] IHttpClientFactory clientFactory, User newUser, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public async override Task Delete(string id)
        {
            await this._service.Delete(id);
        }

        public async Task DeleteUser([Service] IHttpClientFactory clientFactory, string userId, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public async override Task<User> Update(User entity)
        {
            return await this._service.Update(entity);
        }

        public async Task<User> UpdateUserPost([Service] IHttpClientFactory clientFactory, string userId, User updatedUser, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
