using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace Fishare.UserService.Composition.Interfaces
{
    public interface IInitializer
    {
        static void Init(IServiceCollection serviceCollection, IConfiguration configuration) { }
    }
}
