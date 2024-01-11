using EscapadeApi;
using EscapadeApi.Models;
using EscapadeApi.Repositories.Interfaces;
using EscapadeApi.Repositories;
using EscapadeApi.Services;
using EscapadeApi.Services.Interfaces;
using FirebaseAdmin;
using FirebaseAdminAuthentication.DependencyInjection.Extensions;
using Google.Apis.Auth.OAuth2;
using Microsoft.EntityFrameworkCore;
using Path = System.IO.Path;
using Escapade.Api.Schema.Queries;
using Escapade.Api.Schema.Mutations.UserMutation;
using Escapade.Api.Schema.Mutations.PostMutation;
using Escapade.Api.Schema.Mutations;

var builder = WebApplication.CreateBuilder(args);

// Lire la configuration Firebase depuis le fichier firebase-config.json
var firebaseConfigPath = Path.Combine(builder.Environment.ContentRootPath, "firebase-config.json");
var firebaseConfig = File.ReadAllText(firebaseConfigPath);

// Configure Firebase
var firebaseApp = FirebaseApp.Create(new AppOptions
{
    Credential = GoogleCredential.FromJson(firebaseConfig),
});

builder.Services.AddSingleton(firebaseApp);
builder.Services.AddFirebaseAuthentication();

// Lire la configuration CosmoDb depuis le fichier appsettings.json
var configuration = new ConfigurationBuilder()
    .SetBasePath(builder.Environment.ContentRootPath)
    .AddJsonFile("appsettings.json")
    .Build();

string accountEndpointConfig = configuration.GetValue<string>("CosmosDb:AccountEndpoint");
string accountKeyConfig = configuration.GetValue<string>("CosmosDb:AccountKey");
string databaseNameConfig = configuration.GetValue<string>("CosmosDb:DatabaseName");


// Configure CosmoDb
builder.Services.AddDbContextPool<CosmosContext>((options) =>
{
    options.UseCosmos(
        accountEndpoint: accountEndpointConfig,
        accountKey: accountKeyConfig,
        databaseName: databaseNameConfig
    );
});


// Configure DI
builder.Services
        .AddTransient<UserService>()
        .AddTransient<PostService>()
        .AddScoped<IRepository<User>, UserRepository>()
        .AddScoped<IRepository<Post>, PostRepository>()
        .AddScoped<IUserService, UserService>()
        .AddScoped<IPostService, PostService>()
        .AddScoped<IService<User>, UserService>()
        .AddScoped<IService<Post>, PostService>()
        .AddScoped<Query>()
        .AddScoped<UserMutation>()
        .AddScoped<PostQuery>()
        .AddScoped<PostMutation>();
//.AddHttpClient("rest", c => c.BaseAddress = new Uri("http://localhost:7071"));

// Configure HotChocolate
builder.Services
    .AddGraphQLServer()
    .AddMutationConventions(applyToAllMutations: true)
    .AddMutationType<Mutation>()
    .AddQueryType<Query>()
    .AddType<UserQuery>()
    .AddType<User>()
    .AddType<Post>()
    .AddTypeExtension<PostExtensions>()
    .RegisterService<IService<User>>(ServiceKind.Resolver)
    .RegisterService<IUserService>(ServiceKind.Resolver)
    .RegisterService<IService<Post>>(ServiceKind.Resolver)
    .RegisterService<IHttpClientFactory>(ServiceKind.Resolver)
    .AddTypeExtension<PostExtensions>()
    .AddTypeExtension<UserMutation>()
    .AddFiltering()
    .AddSorting()
    .AddProjections()
    .AddAuthorization();

var app = builder.Build();

app.UseRouting();

app.UseAuthentication();

app.UseEndpoints(endpoints =>
{
    endpoints.MapGraphQL().RequireAuthorization();
});

app.Run();
