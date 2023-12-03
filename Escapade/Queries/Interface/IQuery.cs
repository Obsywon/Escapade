using AzureFunctionEscapade.Models.Interfaces;
using HotChocolate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace AzureFunctionEscapade.Queries.Interface
{
    public interface IQuery<T> where T : class, IEntity
    {
        Task<IEnumerable<T>> GetAll();

        Task<T> GetById(string id);
    }
}
