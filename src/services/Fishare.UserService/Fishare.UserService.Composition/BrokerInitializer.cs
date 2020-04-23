using Fishare.UserServices.Composition.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace Fishare.UserService.Composition
{
    public class BrokerInitializer : IInitializer
    {
        public static void Init(IServiceCollection services, IConfiguration configuration)
        {
            var rabbitConfig = configuration.GetSection("rabbit");
            services.Configure<RabbitOptions>(rabbitConfig);

            services.AddSingleton<ObjectPoolProvider, DefaultObjectPoolProvider>();
            services.AddSingleton<IPooledObjectPolicy<IModel>, RabbitModelPooledObjectPolicy>();

            services.AddSingleton<IRabbitManager, RabbitManager>();
        }
    }
}
