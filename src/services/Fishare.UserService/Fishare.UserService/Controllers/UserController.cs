using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Fishare.UserService.Model;
using Fishare.Userservice.BLL.Interfaces;
using Fishare.UserService.DAL.Repository;

namespace Fishare.UserService.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserService _userService;

        public UserController(IUnitOfWork unitOfWork)
        {
            _userService = new Userservice.BLL.UserService(unitOfWork);
        }

        // GET: api/User/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            return await _userService.GetAsync(id);
        }

        // PUT: api/User/5
        [HttpPut("{id}")]
        public void PutUser(int id, User user)
        {
            _userService.Update(id, user);
        }
    }
}
