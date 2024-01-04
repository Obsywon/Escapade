using EscapadeApi.Models.Interfaces;
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
        public Task<T> GetByIdAsync(Guid id);

        public Task<IEnumerable<T>> GetAllAsync();

        public Task<IEnumerable<T>> GetByConditionAsync(Expression<Func<T, bool>> expression);

        public Task<T> CreateAsync(T entity);

        public Task<T> UpdateAsync(T entity);

        public Task DeleteAsync(Guid id);
    }
}
