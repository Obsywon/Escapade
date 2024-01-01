using EscapadeApi.Models;
using EscapadeApi.Queries.Interface;
using EscapadeApi.Repositories;
using EscapadeApi.Services.Interfaces;
using HotChocolate;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EscapadeApi.Queries
{
    public class PostQuery : Query<Post>, IPostQuery
    {
        public PostQuery(IService<Post> service) : base(service) { }

    }
}
