using EscapadeApi.Models.Interfaces;
using Microsoft.Azure.Cosmos.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;


namespace EscapadeApi.Repositories.Interfaces
{
    public abstract class Repository<T> : IRepository<T> where T : class, IEntity
    {
        protected readonly DbContext _dbContext;

        protected Repository(DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public virtual async Task<T> GetByIdAsync(Guid id)
        {
            return await _dbContext.Set<T>()
                .FirstOrDefaultAsync(entity => entity.Id == id);
        }

        public virtual async Task<IEnumerable<T>> GetAllAsync()
        {
            var entities = await _dbContext.Set<T>().ToListAsync();

            return entities;
        }

        public virtual async Task<IEnumerable<T>> GetByConditionAsync(Expression<Func<T, bool>> expression)
        {
            return await _dbContext.Set<T>().Where(expression).ToListAsync();
        }

        public virtual async Task<T> CreateAsync(T entity)
        {
            if (entity.Id.IsNull())
            {
                entity.Id = Guid.NewGuid();
            }

            await _dbContext.Set<T>().AddAsync(entity);
            await _dbContext.SaveChangesAsync();

            return await GetByIdAsync(entity.Id);
        }

        public virtual async Task<T> UpdateAsync(T entity)
        {
            var entry = _dbContext.Add(entity);
            entry.State = EntityState.Unchanged;

            _dbContext.Set<T>().Update(entity);
            await _dbContext.SaveChangesAsync();

            return await GetByIdAsync(entity.Id);
        }

        public virtual async Task DeleteAsync(Guid id)
        {
            var entity = await GetByIdAsync(id);

            _dbContext.Set<T>().Remove(entity);
            await _dbContext.SaveChangesAsync();
        }
    }
}
