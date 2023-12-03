using AzureFunctionEscapade.Models;
using AzureFunctionEscapade.Queries.Interface;
using AzureFunctionEscapade.Services.Interfaces;
using HotChocolate;
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
        public UserQuery(IService<User> service) : base(service) { }

        public async Task<List<User>> GetUsers([Service] IHttpClientFactory clientFactory, [Service] ILogger<UserQuery> logger, CancellationToken cancellationToken)
        {
            using var client = clientFactory.CreateClient("rest");

            Console.WriteLine("GetUsers method called");
            logger.LogInformation("GetUsers method called");

            var content = await client.GetStringAsync($"api/users", cancellationToken);

            Console.WriteLine("Content retrieved successfully");
            logger.LogInformation("Content retrieved successfully");
            var users = JsonConvert.DeserializeObject<List<User>>(content);
            return users;
        }

        public async Task<User> GetUserById(string id, [Service] IHttpClientFactory clientFactory, CancellationToken cancellationToken)
        {
            using var client = clientFactory.CreateClient("rest");
            var content = await client.GetStringAsync($"api/users/{id}", cancellationToken);
            var users = JsonConvert.DeserializeObject<User>(content);
            return users;
        }
    }
}
