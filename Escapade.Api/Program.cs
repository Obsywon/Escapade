using AzureFunctionEscapade;
using AzureFunctionEscapade.Models;
using AzureFunctionEscapade.Mutations;
using AzureFunctionEscapade.Queries;
using AzureFunctionEscapade.Repositories.Interfaces;
using AzureFunctionEscapade.Repositories;
using AzureFunctionEscapade.Services;
using AzureFunctionEscapade.Services.Interfaces;
using FirebaseAdmin;
using FirebaseAdminAuthentication.DependencyInjection.Extensions;
using Google.Apis.Auth.OAuth2;
using Microsoft.EntityFrameworkCore;
using Path = System.IO.Path;
using AzureFunctionEscapade.Mutations.Root;
using AzureFunctionEscapade.Queries.Root;

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

builder.Services.AddDbContextPool<CosmosContext>((options) =>
{
    options.UseCosmos(
        accountEndpoint: "https://cosmos-escapade-dev-fc.documents.azure.com:443/",
        accountKey: "uTZDABFmVId1bmbCGu2n5uJB4W1wyQeWJUPebHG3AJ7cgqtMX97CfMOBwHf3jTkHrtaM1YSDeF6QACDbwsjTwQ==",
        databaseName: "db-cosmos-nosql-escapade-dev-fc"
    );
});

builder.Services
        .AddTransient<UserService>()
        .AddTransient<PostService>()
        .AddScoped<IRepository<User>, UserRepository>()
        .AddScoped<IRepository<Post>, PostRepository>()
        .AddScoped<IUserService, UserService>()
        .AddScoped<IPostService, PostService>()
        .AddScoped<IService<User>, UserService>()
        .AddScoped<IService<Post>, PostService>()
        .AddScoped<UserQuery>()
        .AddScoped<UserMutation>()
        .AddScoped<PostQuery>()
        .AddScoped<PostMutation>()
        .AddHttpClient("rest", c => c.BaseAddress = new Uri("http://localhost:7071"));


builder.Services
    .AddGraphQLServer()
    .AddAuthorization()
    .AddQueryType<RootQuery>()
    .AddMutationType<RootMutation>()
    .AddType<User>()
    .AddType<Post>()
    //.AddTypeExtension<PostExtensions>()
    .RegisterService<IService<User>>(ServiceKind.Resolver)
    .RegisterService<IService<Post>>(ServiceKind.Resolver)
    .RegisterService<IHttpClientFactory>(ServiceKind.Resolver);

var app = builder.Build();

app.UseRouting();

app.UseAuthentication();

app.UseEndpoints(endpoints =>
{
    endpoints.MapGraphQL();
});

app.Run();
