using RabbitMQ.Client.Events;
using System;
using System.Collections.Generic;
using System.Text;

namespace Fishare.UserService.Broker.Interfaces
{
    public interface IRabbitService
    {
        void Publish<T>(T message, string exchangeName, string exchangeType, string routeKey)
        where T : class;

        void Recieve(BasicDeliverEventArgs message);
    }
}
