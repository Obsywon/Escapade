using EscapadeApi.Models;
using EscapadeApi.Repositories.Interfaces;
using EscapadeApi.Services.Interfaces;

namespace EscapadeApi.Services
{
    public class PostService : Service<Post>, IPostService
    {
        public PostService(IRepository<Post> repository) : base(repository) { }
    }
}
