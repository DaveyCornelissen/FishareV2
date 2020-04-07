using Fishare.UserService.DAL;
using Fishare.UserServices.Composition.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

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
                    options.UseSqlServer(configuration.GetConnectionString("DevContext")));
                    break;
                case "Docker":
                    services.AddTransient<ApplicationDbContext>()
                    .AddEntityFrameworkSqlServer()
                    .AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(Environment.GetEnvironmentVariable("FISHARE_USERSERVICE_DB")));
                    break;
                case "Production":
                
                    break;
                default:
                    break;
            }
        }
    }
}
