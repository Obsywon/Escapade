using AzureFunctionEscapade.Mutations.Interface;
using AzureFunctionEscapade.Queries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AzureFunctionEscapade.Mutations.Root
{
    public class RootMutation
    {
        public UserMutation UserMutation { get; }


        public RootMutation(UserMutation userMutation)
        {
            UserMutation = userMutation;
        }
    }
}
