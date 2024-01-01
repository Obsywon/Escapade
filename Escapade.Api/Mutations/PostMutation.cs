using EscapadeApi.Models;
using EscapadeApi.Mutations.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EscapadeApi.Mutations
{
    public class PostMutation : Mutation<Post>, IPostMutation
    {
        public PostMutation() : base() { }
    }
}
