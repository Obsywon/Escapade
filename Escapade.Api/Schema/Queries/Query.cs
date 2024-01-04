using Escapade.Api.Schema.Queries.Interface;
using EscapadeApi.Models.Interfaces;
using EscapadeApi.Repositories.Interfaces;
using EscapadeApi.Services.Interfaces;
using HotChocolate;
using HotChocolate.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Escapade.Api.Schema.Queries
{
    public abstract class Query<T> : IQuery<T> where T : class, IEntity
    {
        public virtual async Task<IEnumerable<T>> GetAll(IService<T> service, CancellationToken cancellation) => await service.GetAll();

        public virtual async Task<T> GetById(Guid id, IService<T> service, CancellationToken cancellation) => await service.GetById(id);

    }
}
