using AzureFunctionEscapade.Models;
using Microsoft.AspNetCore.JsonPatch;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace AzureFunctionEscapade.Mutations
{
    public class UserMutation
    {
        private readonly IHttpClientFactory _clientFactory;

        public UserMutation(IHttpClientFactory clientFactory)
        {
            _clientFactory = clientFactory;
        }

        public async Task<User> CreateUser(User user, CancellationToken cancellationToken)
        {
            using var client = _clientFactory.CreateClient("rest");
            var userJson = JsonConvert.SerializeObject(user);
            var content = new StringContent(userJson, Encoding.UTF8, "application/json");

            var response = await client.PostAsync("api/users", content, cancellationToken);
            response.EnsureSuccessStatusCode();

            var createdUserJson = await response.Content.ReadAsStringAsync();
            var createdUser = JsonConvert.DeserializeObject<User>(createdUserJson);

            return createdUser;
        }

        public async Task<User> UpdateUser(string id, User user, CancellationToken cancellationToken)
        {
            using var client = _clientFactory.CreateClient("rest");
            var userJson = JsonConvert.SerializeObject(user);
            var content = new StringContent(userJson, Encoding.UTF8, "application/json");

            var response = await client.PutAsync($"api/users/{id}", content, cancellationToken);
            response.EnsureSuccessStatusCode();

            var updatedUserJson = await response.Content.ReadAsStringAsync();
            var updatedUser = JsonConvert.DeserializeObject<User>(updatedUserJson);

            return updatedUser;
        }

        public async Task<User> PatchUser(string id, JsonPatchDocument<User> patchDocument, CancellationToken cancellationToken)
        {
            using var client = _clientFactory.CreateClient("rest");
            var patchDocumentJson = JsonConvert.SerializeObject(patchDocument);
            var content = new StringContent(patchDocumentJson, Encoding.UTF8, "application/json-patch+json");

            var response = await client.PatchAsync($"api/users/{id}", content, cancellationToken);
            response.EnsureSuccessStatusCode();

            var patchedUserJson = await response.Content.ReadAsStringAsync();
            var patchedUser = JsonConvert.DeserializeObject<User>(patchedUserJson);

            return patchedUser;
        }

        public async Task DeleteUser(string id, CancellationToken cancellationToken)
        {
            using var client = _clientFactory.CreateClient("rest");

            var response = await client.DeleteAsync($"api/users/{id}", cancellationToken);
            response.EnsureSuccessStatusCode();
        }
    }
}
