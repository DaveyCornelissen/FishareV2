using Fishare.UserService.DAL.Repository.interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace Fishare.UserService.DAL.Repository
{
    public interface IUnitOfWork
    {
        IUserRepository User { get; }
        void Complete();
    }
}
