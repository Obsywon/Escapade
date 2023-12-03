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
using AzureFunctionEscapade.Queries;
using System.IO;
using AzureFunctionEscapade.Mutations;
using AzureFunctionEscapade.Queries.Interface;
using Microsoft.Extensions.Logging;

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


            services.AddSingleton(new FunctionConfiguration(config));
            services.AddLogging(builder => builder.AddConsole());
            services.AddGraphQLFunction();
            services.AddDbContext<CosmosContext>();
            services.AddScoped<IRepository<User>, UserRepository>();
            services.AddScoped<IRepository<Post>, PostRepository>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IPostService, PostService>();
            services.AddScoped<IService<User>, UserService>();
            services.AddScoped<UserQuery>();
            services.AddHttpClient("rest", c => c.BaseAddress = new Uri("http://localhost:7071"));


            services.AddGraphQLServer()
                .AddQueryType<RootQuery>()
                .AddType<User>()
                .AddTypeExtension<PostExtensions>();
                //.AddTypeExtension<UserQuery>()
                //.AddTypeExtension<PostQuery>();


            return services;
        }
    }
}
