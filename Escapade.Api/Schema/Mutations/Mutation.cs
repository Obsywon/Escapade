using Escapade.Api.Schema.Mutations.Interface;
using EscapadeApi.Models.Interfaces;
using EscapadeApi.Services.Interfaces;

namespace Escapade.Api.Schema.Mutations
{
    public abstract class Mutation<T> : IMutation<T> where T : class, IEntity
    {

        public async Task<T> Create(IService<T> service, T entity, CancellationToken cancellation) => await service.Create(entity);

        public async Task Delete(Guid id, IService<T> service, CancellationToken cancellation) => await service.Delete(id);

        public async Task<T> Update(IService<T> service, T entity, CancellationToken cancellation) => await service.Update(entity);
    }
}
