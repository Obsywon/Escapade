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
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Escapade.Api.Schema.Queries
{
    [ExtendObjectType(typeof(Query))]
    public class PostQuery : IPostQuery
    {
        public PostQuery() : base() { }

        public Task<IEnumerable<Post>> GetAllAsync(IService<Post> service, CancellationToken cancellation)
        {
            throw new NotImplementedException();
        }

        public Task<Post> GetByIdAsync(Guid id, IService<Post> service, CancellationToken cancellation)
        {
            throw new NotImplementedException();
        }
    }
}
