using EscapadeApi.Models;
using EscapadeApi.Repositories.Interfaces;
using EscapadeApi.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EscapadeApi.Services
{
    public class PostService : Service<Post>, IPostService
    {
        public PostService(IRepository<Post> repository) : base(repository) { }
    }
}
