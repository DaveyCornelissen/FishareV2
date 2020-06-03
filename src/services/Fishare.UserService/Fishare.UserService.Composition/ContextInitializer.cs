using Fishare.UserService.DAL;
using Fishare.UserService.Composition.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using Fishare.UserService.DAL.Repository;

namespace Fishare.UserService.Composition
{
    public class ContextInitializer : IInitializer
    {
        public static void Init(IServiceCollection services, IConfiguration configuration)
        {
            string stage = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

            services.AddScoped<IUnitOfWork, UnitOfWork>();

            switch (stage)
            {
                case "Development":

                    string dbStage = Environment.GetEnvironmentVariable("DB_ENVIROMENT");

                    services.AddDbContext<ApplicationDbContext>(options =>
                            options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

                    //switch (dbStage)
                    //{
                    //    case "LocalDB":
                    //        services.AddDbContext<ApplicationDbContext>(options =>
                    //        options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));
                    //        break;
                    //    case "LiveDB":
                    //        services.AddDbContext<ApplicationDbContext>(options =>
                    //        options.UseSqlServer(configuration.GetConnectionString("LiveConnection")));
                    //        break;
                    //}
                    break;
                case "Docker":
                    string _containerString = Environment.GetEnvironmentVariable("FISHARE_USERSERVICE_DB_DOCKER");
                    services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(_containerString));
                    break;
                case "Production":
                    string _productionString = Environment.GetEnvironmentVariable("FISHARE_USERSERVICE_DB_PRODUCTION");
                    services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(_productionString));
                    break;
                default:
                    break;
            }
        }
    }
}
