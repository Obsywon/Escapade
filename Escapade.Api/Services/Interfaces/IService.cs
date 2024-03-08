using Escapade.Api.Models.Interfaces;
using System.Linq.Expressions;

namespace Escapade.Api.Services.Interfaces
{
    public interface IService<T> where T : class, IEntity
    {
        public Task<bool> IsFoundAsync(string userId);

        public Task<T> GetByIdAsync(string id);

        public Task<IEnumerable<T>> GetAllAsync();

        public Task<IEnumerable<T>> GetByConditionAsync(Expression<Func<T, bool>> expression);

        public Task<T> CreateAsync(T entity);

        public Task<T> UpdateAsync(T entity);

        public Task DeleteAsync(string id);
    }
}