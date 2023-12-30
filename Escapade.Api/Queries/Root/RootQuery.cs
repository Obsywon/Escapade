using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AzureFunctionEscapade.Queries.Root
{
    public class RootQuery
    {
        public UserQuery UserQuery { get; }
        public PostQuery PostQuery { get; }

        public RootQuery(UserQuery userQuery, PostQuery postQuery)
        {
            UserQuery = userQuery;
            PostQuery = postQuery;
        }
    }
}
