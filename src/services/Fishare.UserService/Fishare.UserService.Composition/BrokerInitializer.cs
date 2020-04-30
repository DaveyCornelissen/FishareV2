using Fishare.UserService.Broker;
using Fishare.UserService.Broker.Interfaces;
using Fishare.UserService.Composition.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.ObjectPool;
using RabbitMQ.Client;

namespace Fishare.UserService.Composition
{
    public class BrokerInitializer : IInitializer
    {
        public static void Init(IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<RabbitOptions>(x => configuration.GetSection("rabbit").Bind(x));
            
            services.AddHostedService<RabbitWorker>();

            services.AddSingleton<ObjectPoolProvider, DefaultObjectPoolProvider>();
            services.AddSingleton<IPooledObjectPolicy<IModel>, RabbitProvider>();
        }
    }
}
