using Fishare.UserService.BLL.Interfaces;
using Fishare.UserService.Broker;
using Fishare.UserService.Broker.Interfaces;
using Fishare.UserService.Composition.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Fishare.UserService.Composition
{
    public class ServicesInitializer : IInitializer
    {
        public static void Init(IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IRabbitService, RabbitService>();
            services.AddScoped<IUserService, BLL.UserService>();
        }
    }
}
