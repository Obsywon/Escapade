using EscapadeApi.Models.Interfaces;
using EscapadeApi.Services.Interfaces;
using HotChocolate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace EscapadeApi.Queries.Interface
{
    public interface IQuery<T> where T : class, IEntity
    {
        Task<IEnumerable<T>> GetAll(IService<T> service, CancellationToken cancellation);

        Task<T> GetById(string id, IService<T> service, CancellationToken cancellation);
    }
}
