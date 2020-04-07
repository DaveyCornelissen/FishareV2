using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace Fishare.UserServices.Composition.Interfaces
{
    public interface IInitializer
    {
        static void Init(IServiceCollection serviceCollection, IConfiguration configuration) { }
    }
}
