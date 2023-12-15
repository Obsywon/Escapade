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
using System.Threading;
using System.Threading.Tasks;

namespace AzureFunctionEscapade.Mutations
{
    public abstract class Mutation<T> : IMutation<T> where T : class, IEntity
    {

        public async Task<T> Create(IService<T> service, T entity, CancellationToken cancellation) => await service.Create(entity);

        public async Task Delete(string id, IService<T> service, CancellationToken cancellation) => await service.Delete(id);

        public async Task<T> Update(IService<T> service, T entity, CancellationToken cancellation) => await service.Update(entity);
    }
}
