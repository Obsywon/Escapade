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
using AzureFunctionEscapade.Queries.Root;
using AzureFunctionEscapade.Mutations.Root;
using Microsoft.EntityFrameworkCore;
using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Extensions;
using HotChocolate.Data;
using HotChocolate;
using System.Net.Http;

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


            //services.AddSingleton(provider =>
            //{
            //    var configuration = provider.GetRequiredService<IConfiguration>();
            //    return new FunctionConfiguration(configuration);
            //});


            // Add DbContextPool using FunctionConfiguration
            //services.AddDbContextPool<CosmosContext>((serviceProvider, options) =>
            //{
            //    var functionConfiguration = serviceProvider.GetRequiredService<FunctionConfiguration>();

            //    options.UseCosmos(
            //        accountEndpoint: functionConfiguration.CosmosAccountEndpoint,
            //        accountKey: functionConfiguration.CosmosAccountKey,
            //        databaseName: functionConfiguration.CosmosDatabaseName
            //    );
            //});

            services.AddDbContextPool<CosmosContext>((options) =>
            {
                options.UseCosmos(
                    accountEndpoint: "https://cosmos-escapade-dev-fc.documents.azure.com:443/",
                    accountKey: "uTZDABFmVId1bmbCGu2n5uJB4W1wyQeWJUPebHG3AJ7cgqtMX97CfMOBwHf3jTkHrtaM1YSDeF6QACDbwsjTwQ==",
                    databaseName: "db-cosmos-nosql-escapade-dev-fc"
                );
            });


            services.AddGraphQLFunction();

            services.AddTransient<UserService>();
            services.AddTransient<PostService>();

            services.AddScoped<IRepository<User>, UserRepository>();
            services.AddScoped<IRepository<Post>, PostRepository>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IPostService, PostService>();
            services.AddScoped<IService<User>, UserService>();
            services.AddScoped<IService<Post>, PostService>();
            services.AddScoped<UserQuery>();
            services.AddScoped<UserMutation>();
            services.AddScoped<PostQuery>();
            services.AddScoped<PostMutation>();
            services.AddHttpClient("rest", c => c.BaseAddress = new Uri("http://localhost:7071"));

            services.AddGraphQLServer()
                .AddQueryType<RootQuery>()
                .AddMutationType<RootMutation>()
                .AddType<User>()
                .AddType<Post>()
                //.AddTypeExtension<PostExtensions>()
                .RegisterService<IService<User>>(ServiceKind.Resolver)
                .RegisterService<IService<Post>>(ServiceKind.Resolver)
                .RegisterService<IHttpClientFactory>(ServiceKind.Resolver);


            return services;
        }
    }
}
