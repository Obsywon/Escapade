using EscapadeApi.Models.Interfaces;
using EscapadeApi.Repositories.Interfaces;
using System.Linq.Expressions;

namespace EscapadeApi.Services.Interfaces
{
    public abstract class Service<T> : IService<T> where T : class, IEntity
    {
        protected readonly IRepository<T> _repository;

        protected Service(IRepository<T> repository)
        {
            _repository = repository;
        }

        public async Task<bool> IsFoundAsync(string userId)
        {
            return (await _repository.GetByConditionAsync(x => x.Id == userId)).Any();
        }

        public virtual async Task<T> GetByIdAsync(string id)
        {
            try
            {
                return await _repository.GetByIdAsync(id);
            }
            catch (Exception ex)
            {
                // Gérer ou logger l'exception selon les besoins
                throw new GraphQLException(new Error("An error occurred while fetching all users.", ex.Message));
            }
        }

        public virtual async Task<IEnumerable<T>> GetAllAsync()
        {
            try
            {
                return await _repository.GetAllAsync();
            }
            catch (Exception ex)
            {
                // Gérer ou logger l'exception selon les besoins
                throw;
            }
        }

        public virtual async Task<IEnumerable<T>> GetByConditionAsync(Expression<Func<T, bool>> expression)
        {
            try
            {
                return await _repository.GetByConditionAsync(expression);
            }
            catch (Exception ex)
            {
                // Gérer ou logger l'exception selon les besoins
                throw;
            }
        }

        public virtual async Task<T> CreateAsync(T entity)
        {
            try
            {
                return await _repository.CreateAsync(entity);
            }
            catch (Exception ex)
            {
                // Gérer ou logger l'exception selon les besoins
                throw;
            }
        }

        public virtual async Task<T> UpdateAsync(T entity)
        {
            try
            {
                return await _repository.UpdateAsync(entity);
            }
            catch (Exception ex)
            {
                // Gérer ou logger l'exception selon les besoins
                throw;
            }
        }

        public virtual async Task DeleteAsync(string id)
        {
            try
            {
                await _repository.DeleteAsync(id);
            }
            catch (Exception ex)
            {
                // Gérer ou logger l'exception selon les besoins
                throw;
            }
        }

    }
}