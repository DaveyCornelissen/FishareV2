using Fishare.UserService.DAL.Repository.interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace Fishare.UserService.DAL.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _context;

        public UnitOfWork(ApplicationDbContext context)
        {
            _context = context;
            User = new UserRepository(_context);
        }

        public IUserRepository User { get; private set; }

        public void Complete()
        {
            _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
