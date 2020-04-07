using System;
using System.ComponentModel.DataAnnotations;

namespace Fishare.UserService.Model
{
    public class User
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        public string Adress { get; set; }

        public string Country { get; set; }
    }
}
