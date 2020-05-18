using Fishare.UserService.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace Fishare.UserService.Broker.Events
{
    public class EventContent
    {
        public string pattern { get; set; }

        public User data { get; set; }
    }
}
