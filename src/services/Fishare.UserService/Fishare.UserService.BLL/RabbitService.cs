using Fishare.UserService.Broker.Interfaces;
using Fishare.UserService.Model;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using System;
using Fishare.UserService.BLL.Interfaces;

namespace Fishare.UserService.Broker
{
    public class RabbitService : IRabbitService
    {
        private readonly IUserService _userService;
        public RabbitService(IServiceScopeFactory scopeFactory)
        {
            using var serviceScope = scopeFactory.CreateScope();
            _userService = serviceScope.ServiceProvider.GetRequiredService<IUserService>();
        }
       
        public void Publish<T>(T message, string exchangeName, string exchangeType, string routeKey) where T : class
        {
            throw new NotImplementedException();
        }

        public void Recieve(string operations, string payload)
        {
            // received message  
            User content = JsonConvert.DeserializeObject<User>(payload);

            var operation = operations.Split(".")[2];
            
            switch (operation)
            {
                case "created":
                    _userService.Create(content); 
                    break;
                case "deleted":
                    break;
                default:
                    break;
            }

        }
    }
}
