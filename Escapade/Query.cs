using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AzureFunctionEscapade.Models;
using AzureFunctionEscapade.Repositories;
using AzureFunctionEscapade.Services;
using HotChocolate;
using Microsoft.EntityFrameworkCore;

namespace AzureFunctionEscapade
{
    public class Query
    {
        public async Task<List<User>> GetUsers(CosmosContext _context)
            => await _context.Users.ToListAsync();
    }
}
