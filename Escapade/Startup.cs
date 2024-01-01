using Microsoft.Azure.Cosmos.Fluent;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using EscapadeApi;
using EscapadeApi.Repositories.Interfaces;
using EscapadeApi.Services.Interfaces;
using EscapadeApi.Services;
using EscapadeApi.Models;
using EscapadeApi.Repositories;
using System;
using EscapadeApi.Queries;
using System.IO;
using EscapadeApi.Mutations;
using EscapadeApi.Queries.Interface;
using Microsoft.Extensions.Logging;
using EscapadeApi.Queries.Root;
using EscapadeApi.Mutations.Root;

[assembly: FunctionsStartup(typeof(Startup))]

namespace EscapadeApi
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
            services.AddScoped<UserMutation>();
            services.AddHttpClient("rest", c => c.BaseAddress = new Uri("http://localhost:7071"));


            services.AddGraphQLServer()
                .AddQueryType<RootQuery>()
                .AddMutationType<RootMutation>()
                .AddType<User>()
                .AddTypeExtension<PostExtensions>();


            return services;
        }
    }
}
