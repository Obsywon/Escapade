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
    public class PostQuery : Query<Post>, IPostQuery
    {
        public PostQuery() : base() { }

    }
}
