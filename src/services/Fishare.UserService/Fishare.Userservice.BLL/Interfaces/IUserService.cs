using Fishare.UserService.Model;
using System.Threading.Tasks;

namespace Fishare.UserService.BLL.Interfaces
{
    public interface IUserService
    {
        void Create(User user);

        void Delete(int id);

        void Update(int id, User user);

        Task<User> GetAsync(int id);
    }
}
