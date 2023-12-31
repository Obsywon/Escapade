﻿using EscapadeApi.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace EscapadeApi.Repositories.Interfaces
{
    public interface IRepository<T> where T : class, IEntity
    {
        public Task<T> GetById(Guid id);

        public Task<IEnumerable<T>> GetAll();

        public Task<IEnumerable<T>> GetByCondition(Expression<Func<T, bool>> expression);

        public Task<T> Create(T entity);

        public Task<T> Update(T entity);

        public Task Delete(Guid id);
    }
}
