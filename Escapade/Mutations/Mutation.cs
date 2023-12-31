using AzureFunctionEscapade.Models.Interfaces;
using AzureFunctionEscapade.Mutations.Interface;
using AzureFunctionEscapade.Queries.Interface;
using AzureFunctionEscapade.Services;
using AzureFunctionEscapade.Services.Interfaces;
using HotChocolate;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AzureFunctionEscapade.Mutations
{
    public abstract class Mutation<T> : IMutation<T> where T : class, IEntity
    {
        protected readonly IService<T> _service;

        protected Mutation(IService<T> service)
        {
            _service = service;
        }

        public abstract Task<T> Create(T entity);

        public abstract Task Delete(string id); 

        public abstract Task<T> Update(T entity); 
    }
}
