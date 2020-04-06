using Fishare.UserService.Model;

namespace Fishare.Userservice.BLL.Interfaces
{
    public interface IUserService
    {
        void Create(User user);

        void Delete(User iser);

        User Get(int id);
    }
}
