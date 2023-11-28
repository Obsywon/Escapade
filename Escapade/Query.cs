using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using AzureFunctionEscapade.Models;
using AzureFunctionEscapade.Repositories;
using AzureFunctionEscapade.Services;
using AzureFunctionEscapade.Services.Interfaces;
using HotChocolate;
using HotChocolate.AzureFunctions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace AzureFunctionEscapade
{
    public class Query
    {
        public async Task<List<User>> GetUsers([Service] IUserService userService)
            => await userService.GetAll();
    }
}
