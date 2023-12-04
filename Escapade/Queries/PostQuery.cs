using AzureFunctionEscapade.Models;
using AzureFunctionEscapade.Queries.Interface;
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
    public class PostQuery : Query<Post>, IPostQuery
    {
        public PostQuery(IService<Post> service) : base(service) { }

    }
}
