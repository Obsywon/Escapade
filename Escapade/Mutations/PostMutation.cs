using AzureFunctionEscapade.Models;
using AzureFunctionEscapade.Mutations.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AzureFunctionEscapade.Mutations
{
    public class PostMutation : Mutation<Post>, IPostMutation
    {
        public PostMutation() : base() { }
    }
}
