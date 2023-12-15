using AzureFunctionEscapade.Models.Interfaces;
using AzureFunctionEscapade.Queries.Interface;
using AzureFunctionEscapade.Repositories.Interfaces;
using AzureFunctionEscapade.Services.Interfaces;
using HotChocolate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace AzureFunctionEscapade.Queries
{
    public abstract class Query<T> : IQuery<T> where T : class, IEntity
    {

        public virtual async Task<IEnumerable<T>> GetAll(IService<T> service, CancellationToken cancellation) => await service.GetAll();

        public virtual async Task<T> GetById(string id, IService<T> service, CancellationToken cancellation) => await service.GetById(id);

    }
}
