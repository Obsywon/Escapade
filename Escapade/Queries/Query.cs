using EscapadeApi.Models.Interfaces;
using EscapadeApi.Queries.Interface;
using EscapadeApi.Repositories.Interfaces;
using EscapadeApi.Services.Interfaces;
using HotChocolate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace EscapadeApi.Queries
{
    public abstract class Query<T> : IQuery<T> where T : class, IEntity
    {
        protected readonly IService<T> _service;

        protected Query(IService<T> service)
        {
            _service = service;
        }

        public virtual async Task<IEnumerable<T>> GetAll() => await _service.GetAll();

        public virtual async Task<T> GetById(string id) => await _service.GetById(id);

    }
}
