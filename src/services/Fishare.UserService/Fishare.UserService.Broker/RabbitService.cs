using Fishare.UserService.Broker.Interfaces;
using RabbitMQ.Client.Events;
using System;
using System.Diagnostics;
using System.Text;

namespace Fishare.UserService.Broker
{
    public class RabbitService : IRabbitService
    {
        public void Publish<T>(T message, string exchangeName, string exchangeType, string routeKey) where T : class
        {
            throw new NotImplementedException();
        }

        public void Recieve(BasicDeliverEventArgs message)
        {
            // received message  
            string content = Encoding.UTF8.GetString(message.Body.ToArray());

        }
    }
}
