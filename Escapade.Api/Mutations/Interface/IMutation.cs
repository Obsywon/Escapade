using EscapadeApi.Models.Interfaces;
using EscapadeApi.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace EscapadeApi.Mutations.Interface
{
    public interface IMutation<T> where T : class, IEntity
    {
        Task<T> Create(IService<T> service, T entity, CancellationToken cancellation);

        Task<T> Update(IService<T> service, T entity, CancellationToken cancellation);

        Task Delete(string id, IService<T> service, CancellationToken cancellation);
    }
}
