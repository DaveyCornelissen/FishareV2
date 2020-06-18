using Fishare.UserService.Model;
using System.Threading.Tasks;

namespace Fishare.UserService.BLL.Interfaces
{
    public interface IUserService
    {
        void Create(User user);

        void Delete(string id);

        void Update(string id, User user);

        Task<User> GetAsync(int id);
    }
}
