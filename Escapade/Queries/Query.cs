using AzureFunctionEscapade.Models;
using AzureFunctionEscapade.Repositories;
using AzureFunctionEscapade.Services.Interfaces;
using HotChocolate;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AzureFunctionEscapade.Queries
{
    public class Query
    {
        public async Task<List<Post>> GetPosts([Service] IPostService service)
            => (List<Post>)await service.GetAll();

        public async Task<Post> GetPostById(string id, [Service] IPostService service)
            => await service.GetById(id);
    }
}
