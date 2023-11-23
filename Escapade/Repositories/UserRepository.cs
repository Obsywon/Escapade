using AzureFunctionEscapade.Models;
using AzureFunctionEscapade.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AzureFunctionEscapade.Repositories
{
    public class UserRepository : Repository<User>
    {
        public UserRepository(CosmosContext dbContext) : base(dbContext) {}

    }
}
