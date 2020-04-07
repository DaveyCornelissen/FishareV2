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

        // GET: api/User
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<User>>> GetUser()
        //{
        //    return await _context.User.ToListAsync();
        //}

        // GET: api/User/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            return await _userService.GetAsync(id);
        }

        // PUT: api/User/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public void PutUser(int id, User user)
        {
            _userService.Update(id, user);
        }

        // POST: api/User
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public void PostUser(User user)
        {
            _userService.Create(user);
        }

        // DELETE: api/User/5
        [HttpDelete("{id}")]
        public void DeleteUser(int id)
        {
            _userService.Delete(id);
        }


    }
}
