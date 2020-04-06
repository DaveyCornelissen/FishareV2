using System;
using System.Collections.Generic;
using System.Text;

namespace Fishare.Userservice.DAL.Repository
{
    public interface IRepository<T> where T : class
    {
        T Get(int id);

        void Remove(T entity);

        void Add(T entity);

        IEnumerable<T> GetAll();

    }
}
