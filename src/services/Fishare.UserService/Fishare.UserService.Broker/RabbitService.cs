using Fishare.UserService.Broker.Interfaces;
using System;

namespace Fishare.UserService.Broker
{
    public class RabbitService : IRabbitService
    {
        public void Publish<T>(T message, string exchangeName, string exchangeType, string routeKey) where T : class
        {
            throw new NotImplementedException();
        }
    }
}
