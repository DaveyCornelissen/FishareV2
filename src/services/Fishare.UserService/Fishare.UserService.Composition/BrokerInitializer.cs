using Fishare.UserService.BBL.Broker;
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
                    services.Configure<RabbitOptions>(x => {
                        x.HostName = rabbitOptions.HostName;
                        x.UserName = rabbitOptions.UserName;
                        x.Password = rabbitOptions.Password;
                        x.Port = rabbitOptions.Port;
                        x.Queue = rabbitOptions.Queue;
                        x.Exchange = rabbitOptions.Exchange;
                        x.VHost = rabbitOptions.VHost;
                    });
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
