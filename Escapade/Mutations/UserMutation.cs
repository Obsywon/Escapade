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
        public UserMutation() : base() { }

        public async Task<User> CreateUserRestApi(IHttpClientFactory clientFactory, User newUser, CancellationToken cancellationToken)
        {
            using var client = clientFactory.CreateClient("rest");


            var jsonContent = JsonConvert.SerializeObject(newUser);
            var stringContent = new StringContent(jsonContent, Encoding.UTF8, "application/json");

            var response = await client.PostAsync("api/users", stringContent, cancellationToken);

            response.EnsureSuccessStatusCode(); 

            var responseContent = await response.Content.ReadAsStringAsync();
            var createdUser = JsonConvert.DeserializeObject<User>(responseContent);

            return createdUser;
        }

        public async Task<User> UpdateUserRestApi(IHttpClientFactory clientFactory, string userId, User updatedUser, CancellationToken cancellationToken)
        {
            using var client = clientFactory.CreateClient("rest");


            var jsonContent = JsonConvert.SerializeObject(updatedUser);
            var stringContent = new StringContent(jsonContent, Encoding.UTF8, "application/json");

            var response = await client.PutAsync($"api/users/{userId}", stringContent, cancellationToken);

            response.EnsureSuccessStatusCode();

            var responseContent = await response.Content.ReadAsStringAsync();
            var modifiedUser = JsonConvert.DeserializeObject<User>(responseContent);

            return modifiedUser;
        }

        public async Task DeleteUserRestApi(IHttpClientFactory clientFactory, string userId, CancellationToken cancellationToken)
        {
            using var client = clientFactory.CreateClient("rest");

            var response = await client.DeleteAsync($"api/users/{userId}", cancellationToken);

            response.EnsureSuccessStatusCode();
        }
    }
}
