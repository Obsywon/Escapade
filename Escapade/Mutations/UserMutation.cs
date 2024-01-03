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
    public class UserMutation 
    {
        public async Task<User> Create([Service] IUserService userService, User entity)
        {
            if (await userService.CheckForConflictingUser(entity))
            {
                throw new InvalidOperationException("email address is already in use.");
            } else if (!userService.IsPasswordSecure(entity))
            {
                throw new InvalidOperationException("password is invalid.");
            } else if (!userService.IsNameOrLastNameValid(entity))
            {
                throw new InvalidOperationException("user's name is invalid.");
            } else if (!userService.IsBirthDateValid(entity))
            {
                throw new InvalidOperationException("birthdate is invalid.");
            }

            entity.Password = await userService.EncryptPassword(entity);
            return await userService.Create(entity);
        }

        public async Task<User> CreateUser([Service] IHttpClientFactory clientFactory, User newUser, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public async  Task Delete([Service] IUserService userService, string id, CancellationToken cancellationtoken)
        {
            await userService.Delete(id);
        }

        public async Task DeleteUser([Service] IHttpClientFactory clientFactory, string userId, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }

        public async  Task<User> Update([Service] IUserService userService, User entity, CancellationToken cancellationToken)
        {
            return await userService.Update(entity);
        }

        public async Task<User> UpdateUserPost([Service] IHttpClientFactory clientFactory, string userId, User updatedUser, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
