using Microsoft.Azure.Cosmos.Fluent;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using AzureFunctionEscapade;
using AzureFunctionEscapade.Repositories.Interfaces;
using AzureFunctionEscapade.Services.Interfaces;
using AzureFunctionEscapade.Services;
using AzureFunctionEscapade.Models;
using AzureFunctionEscapade.Repositories;
using System;

[assembly: FunctionsStartup(typeof(Startup))]

namespace AzureFunctionEscapade
{
    public class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            ConfigureServices(builder.Services).BuildServiceProvider(true);

        }

        private IServiceCollection ConfigureServices(IServiceCollection services)
        {
            var config = new ConfigurationBuilder()
                .SetBasePath(Environment.CurrentDirectory)
                .AddJsonFile("local.settings.json", true, true)
                .AddEnvironmentVariables()
                .Build();

            services.AddSingleton(new FunctionConfiguration(config))
            .AddDbContext<CosmosContext>()
            .AddGraphQLFunction()
            .AddGraphQLServer()
            .RegisterDbContext<CosmosContext>()
            .AddQueryType<Query>()
            .AddMutationType<Mutation>()
            .AddMutationConventions();

            services.AddScoped<IRepository<User>, UserRepository>();
            services.AddScoped<IUserService, UserService>();

            return services;
        }
    }
}
