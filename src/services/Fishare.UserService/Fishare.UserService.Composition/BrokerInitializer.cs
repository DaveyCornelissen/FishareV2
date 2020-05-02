using Fishare.UserService.BBL.Broker;
using Fishare.UserService.Broker;
using Fishare.UserService.Broker.Interfaces;
using Fishare.UserService.Composition.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.ObjectPool;
using RabbitMQ.Client;
using System;

namespace Fishare.UserService.Composition
{
    public class BrokerInitializer : IInitializer
    {
        public static void Init(IServiceCollection services, IConfiguration configuration)
        {
            string stage = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

            RabbitOptions rabbitOptions = new RabbitOptions
            {
                HostName = Environment.GetEnvironmentVariable("FISHARE_RBMQ_HOSTNAME"),
                UserName = Environment.GetEnvironmentVariable("FISHARE_RBMQ_USERNAME"),
                Password = Environment.GetEnvironmentVariable("FISHARE_RBMQ_PASSWORD"),
                VHost = Environment.GetEnvironmentVariable("FISHARE_RBMQ_VHOST"),
                Queue = Environment.GetEnvironmentVariable("FISHARE_RBMQ_QUEUE"),
                Exchange = Environment.GetEnvironmentVariable("FISHARE_RBMQ_EXCHANGE"),
                Port = Convert.ToInt32(Environment.GetEnvironmentVariable("FISHARE_RBMQ_PORT"))
            };

            switch (stage)
            {
                case "Development":
                    services.Configure<RabbitOptions>(x => configuration.GetSection("rabbit").Bind(x));
                    break;
                case "Docker":

                    services.Configure<RabbitOptions>(x => {x = rabbitOptions;});
                    break;
                case "Production":
                    services.Configure<RabbitOptions>(x => {x = rabbitOptions;});
                    break;
                default:
                    break;
            }

            services.AddHostedService<RabbitWorker>();
            services.AddSingleton<ObjectPoolProvider, DefaultObjectPoolProvider>();
            services.AddSingleton<IPooledObjectPolicy<IModel>, RabbitProvider>();
        }
    }
}
