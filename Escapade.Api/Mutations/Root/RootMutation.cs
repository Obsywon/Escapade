using EscapadeApi.Mutations.Interface;
using EscapadeApi.Queries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EscapadeApi.Mutations.Root
{
    public class RootMutation
    {
        public UserMutation UserMutation { get; }
        public PostMutation PostMutation { get; }


        public RootMutation(UserMutation userMutation, PostMutation postMutation)
        {
            UserMutation = userMutation;
            PostMutation = postMutation;
        }
    }
}
