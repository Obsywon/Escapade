using Escapade.Api.Schema.Queries.Interface;
using EscapadeApi.Models;
using EscapadeApi.Services.Interfaces;
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
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Escapade.Api.Schema.Queries
{
    [ExtendObjectType(typeof(Query))]
    public class UserQuery : IUserQuery
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

        public async Task<IEnumerable<User>> GetAllAsync(IService<User> service, CancellationToken cancellation)
        {
            return await service.GetAllAsync();
        }

        public async Task<User> GetByIdAsync(Guid id, IService<User> service, CancellationToken cancellation)
        {
            return await service.GetByIdAsync(id);
        }
    }
}
