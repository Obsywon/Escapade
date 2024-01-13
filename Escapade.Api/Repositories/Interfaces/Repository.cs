using EscapadeApi.Models.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;


namespace EscapadeApi.Repositories.Interfaces
{
    public abstract class Repository<T> : IRepository<T> where T : class, IEntity
    {
        protected readonly DbContext _dbContext;

        protected Repository(DbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public virtual async Task<T> GetByIdAsync(string id)
        {
            try
            {
                if(id == null || id == string.Empty)
                    throw new ArgumentNullException(nameof(id));
                var result = await _dbContext.Set<T>().FirstOrDefaultAsync(entity => entity.Id == id);
                if (result == null)
                    throw new Exception("Entity with Id : " + id + " not found");
                return result;
            }
            catch(Exception ex)
            {
                throw new GraphQLException(new Error("An error occurred while fetching all users.", ex.Message));
            }
           
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
            if (entity.Id == null || entity.Id == Guid.Empty.ToString())
            {
                entity.Id = Guid.NewGuid().ToString();
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

        public virtual async Task DeleteAsync(string id)
        {
            var entity = await GetByIdAsync(id);

            _dbContext.Set<T>().Remove(entity);
            await _dbContext.SaveChangesAsync();
        }
    }
}
