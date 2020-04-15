using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Fishare.Userservice.DAL.Repository
{
    public interface IRepository<T> where T : class
    {
        Task<T> GetAsync(int id);

        T Get(int id);

        void Remove(T entity);

        void Add(T entity);

        IEnumerable<T> GetAll();

    }
}
