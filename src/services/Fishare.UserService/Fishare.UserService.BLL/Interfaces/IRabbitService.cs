namespace Fishare.UserService.Broker.Interfaces
{
    public interface IRabbitService
    {
        void Publish<T>(T message, string exchangeName, string exchangeType, string routeKey)
        where T : class;

        void Recieve(string operation, string message);
    }
}
