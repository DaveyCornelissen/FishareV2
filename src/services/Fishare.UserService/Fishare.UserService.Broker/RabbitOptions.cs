using System;
using System.Collections.Generic;
using System.Text;

namespace Fishare.UserService.Broker
{
    public class RabbitOptions
    {
        public string UserName { get; set; }

        public string Password { get; set; }

        public string HostName { get; set; }

        public int Port { get; set; } = 5672;

        public string VHost { get; set; } = "Fishare_Vhost";

        public string Exchange { get; set; }

        public string Queue { get; set; }
    }
}
