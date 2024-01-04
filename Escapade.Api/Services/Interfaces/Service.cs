using EscapadeApi.Models.Interfaces;
using EscapadeApi.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace EscapadeApi.Services.Interfaces
{
    public abstract class Service<T> : IService<T> where T : class, IEntity
    {
        protected readonly IRepository<T> _repository;

        protected Service(IRepository<T> repository)
        {
            _repository = repository;
        }

        public virtual async Task<T> GetByIdAsync(Guid id) => await _repository.GetByIdAsync(id);

        public virtual async Task<IEnumerable<T>> GetAllAsync() => await _repository.GetAllAsync();

        public virtual async Task<IEnumerable<T>> GetByConditionAsync(Expression<Func<T, bool>> expression) => await _repository.GetByConditionAsync(expression);

        public virtual async Task<T> CreateAsync(T entity) => await _repository.CreateAsync(entity);

        public virtual async Task<T> UpdateAsync(T entity) => await _repository.UpdateAsync(entity);

        public virtual async Task DeleteAsync(Guid id) => await _repository.DeleteAsync(id);
    }
}