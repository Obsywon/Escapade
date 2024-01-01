using EscapadeApi.Models.Interfaces;
using EscapadeApi.Mutations.Interface;
using EscapadeApi.Queries.Interface;
using EscapadeApi.Services;
using EscapadeApi.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EscapadeApi.Mutations
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
