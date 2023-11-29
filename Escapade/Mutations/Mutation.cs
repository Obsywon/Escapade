using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AzureFunctionEscapade.Models;
using AzureFunctionEscapade.Services.Interfaces;
using HotChocolate;
using AzureFunctionEscapade.Services;
using Microsoft.EntityFrameworkCore;

namespace AzureFunctionEscapade.Mutations
{
    public class Mutation
    {
        public async Task<User> AddUser(string id, string name, string lastname, string genre, string email, string password, string birthdate, CosmosContext cosmosContext)
        {
            User user = new User(id, name, lastname, genre, email, password, birthdate);
            await cosmosContext.Users.AddAsync(user);
            await cosmosContext.SaveChangesAsync();
            return user;
        }
    }
}
