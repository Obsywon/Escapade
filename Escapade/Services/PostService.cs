using AzureFunctionEscapade.Models;
using AzureFunctionEscapade.Repositories.Interfaces;
using AzureFunctionEscapade.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AzureFunctionEscapade.Services
{
    public class PostService : Service<Post>, IPostService
    {
        public PostService(Repositories.Interfaces.IRepository<Post> repository) : base(repository) { }
    }
}
