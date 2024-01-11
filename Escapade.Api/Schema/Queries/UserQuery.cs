using Escapade.Api.Schema.Queries.Interface;
using EscapadeApi.Models;
using EscapadeApi.Services;
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

namespace Escapade.Api.Schema.Queries
{
    [ExtendObjectType(typeof(Query))]
    public class UserQuery 
    {
        public UserQuery() : base() { }

        public async Task<IEnumerable<User>> GetAllUserAsync(IService<User> service, CancellationToken cancellation)
        {
            return await service.GetAllAsync();
        }

        public async Task<User> GetUserById(IService<User> service, string id, CancellationToken cancellation)
        {
            return await service.GetByIdAsync(id);
        }

        public async Task<User> GetUserByEmail(UserService service, string email, CancellationToken cancellation)
        {
            return await service.GetUserByEmailAsync(email);
        }
    }
}
