using AzureFunctionEscapade.Models;
using AzureFunctionEscapade.Queries.Interface;
using AzureFunctionEscapade.Services.Interfaces;
using HotChocolate;
using HotChocolate.Authorization;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

namespace AzureFunctionEscapade.Queries
{

    public class UserQuery : Query<User>, IUserQuery
    {
        public UserQuery() : base() { }

        
        public async Task<List<User>> GetUsers(IHttpClientFactory clientFactory, CancellationToken cancellationToken)
        {
            using var client = clientFactory.CreateClient("rest");
            var content = await client.GetStringAsync($"api/users", cancellationToken);
            var users = JsonConvert.DeserializeObject<List<User>>(content);
            return users;
        }

        public async Task<User> GetUserById(string id, IHttpClientFactory clientFactory, CancellationToken cancellationToken)
        {
            using var client = clientFactory.CreateClient("rest");
            var content = await client.GetStringAsync($"api/users/{id}", cancellationToken);
            var users = JsonConvert.DeserializeObject<User>(content);
            return users;
        }
    }
}
