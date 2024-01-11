using Escapade.Api.Schema.Queries.Interface;
using EscapadeApi.Models;
using EscapadeApi.Repositories;
using EscapadeApi.Services.Interfaces;
using HotChocolate;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Escapade.Api.Schema.Queries
{
    [ExtendObjectType(typeof(Query))]
    public class PostQuery
    {
        public PostQuery() : base() { }

        public async Task<IEnumerable<Post>> GetAllPostAsync(IPostService service, CancellationToken cancellation)
        {
            return await service.GetAllAsync();
        }

        public async Task<Post> GetPostById(IPostService service, string id, CancellationToken cancellation)
        {
            return await service.GetByIdAsync(id);
        }

    }
}
