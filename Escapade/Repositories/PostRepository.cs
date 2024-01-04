using EscapadeApi.Models;
using EscapadeApi.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EscapadeApi.Repositories
{
    public class PostRepository : Repository<Post>
    {
        public PostRepository(CosmosContext dbContext) : base(dbContext) { }
    }
}
