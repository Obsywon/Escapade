﻿using EscapadeApi.Models;
using HotChocolate;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Escapade.Api.Schema.Queries.Interface
{
    public interface IUserQuery : IQuery<User>
    {
        public Task<List<User>> GetUsers(IHttpClientFactory clientFactory, CancellationToken cancellationToken);

        public Task<User> GetUserById(string id, IHttpClientFactory clientFactory, CancellationToken cancellationToken);
    }
}
