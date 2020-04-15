using Fishare.UserService.DAL;
using Fishare.UserServices.Composition.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace Fishare.UserServices.Composition
{
    public class ContextInitializer : IInitializer
    {
        public static void Init(IServiceCollection services, IConfiguration configuration)
        {
            string stage = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
            string containerString = Environment.GetEnvironmentVariable("FISHARE_USERSERVICE_DB");

            switch (stage)
            {
                case "Development":
                    services.AddDbContext<ApplicationDbContext>(options =>
                    options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));
                    break;
                case "Docker":
                    services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(containerString));
                    break;
                case "Production":
                    services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(containerString));
                    break;
                default:
                    break;
            }
        }
    }
}
