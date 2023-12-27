using AzureFunctionEscapade.Models.Interfaces;
using AzureFunctionEscapade.Mutations.Interface;
using AzureFunctionEscapade.Queries.Interface;
using AzureFunctionEscapade.Services;
using AzureFunctionEscapade.Services.Interfaces;
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

        public async Task<T> Create(T entity) => await _service.Create(entity);

        public async Task Delete(string id) => await _service.Delete(id);

        public async Task<T> Update(T entity) => await _service.Update(entity);
    }
}
