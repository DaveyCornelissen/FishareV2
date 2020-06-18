using Fishare.UserService.BLL.Interfaces;
using Fishare.UserService.DAL;
using Fishare.UserService.DAL.Repository;
using Fishare.UserService.Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Fishare.UserService.BLL
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        public UserService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public void Create(User user)
        {
            _unitOfWork.User.Add(user);
            _unitOfWork.Complete();
        }

        public void Delete(string id)
        {
            User user = _unitOfWork.User.Get(id);
            if (user == null) return;

            _unitOfWork.User.Remove(user);
            _unitOfWork.Complete();
        }

        public async Task<User> GetAsync(int id)
        {
            return await _unitOfWork.User.GetAsync(id);
        }

        public void Update(string id, User user)
        {
            User oldUser = _unitOfWork.User.Get(id);
            if (oldUser == null) return;

            oldUser.Email = user.Email;
            oldUser.Username = user.Username;
            oldUser.Country = user.Country;

            _unitOfWork.Complete();
        }

    }
}
