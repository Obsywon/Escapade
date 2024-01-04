using Escapade.Api.Schema.Mutations.Interface;
using EscapadeApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Escapade.Api.Schema.Mutations
{
    public class PostMutation : Mutation<Post>, IPostMutation
    {
        public PostMutation() : base() { }
    }
}
