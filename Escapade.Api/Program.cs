using Escapade.Api.Schema.Mutations;
using Escapade.Api.Schema.Queries;
using EscapadeApi;
using EscapadeApi.Models;
using EscapadeApi.Repositories;
using EscapadeApi.Repositories.Interfaces;
using EscapadeApi.Services;
using EscapadeApi.Services.Interfaces;
using FirebaseAdmin;
using FirebaseAdminAuthentication.DependencyInjection.Extensions;
using Google.Apis.Auth.OAuth2;
using HotChocolate.AspNetCore;
using Microsoft.EntityFrameworkCore;
using Path = System.IO.Path;

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

string databaseName = configuration.GetValue<string>("CosmosDb:DatabaseName");
string connectionString = configuration.GetValue<string>("CosmosDb:ConnectionString");


// Configure CosmoDb
builder.Services.AddDbContextPool<CosmosContext>((options) =>
{
    options.UseCosmos(
        connectionString,
        databaseName
    );
});


// Configure Dependancy Injection
builder.Services
        .AddScoped<IRepository<User>, UserRepository>() // -- UserService
        .AddScoped<IUserService, UserService>() // -- UserQuery & UserMutation
        .AddHttpContextAccessor();




// Configure HotChocolate
builder.Services
    .AddGraphQLServer()
    .AddTypes()
    .AddMutationType<Mutation>()
    .AddQueryType<Query>()
    
    .AddMutationConventions(applyToAllMutations: true)

    .RegisterService<IUserService>(ServiceKind.Resolver) // -- UserService
    .RegisterService<IHttpContextAccessor>(ServiceKind.Resolver) // -- IHttpContextAccessor



    .AddFiltering()
    .AddSorting()
    .AddProjections()
    .AddAuthorization();

var app = builder.Build();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    // -- Force l'authentification sur l'endpoint GraphQl
    // -- Dans notre cas : /graphql
    // -- BanacakePop n'est donc pas non plus disponible sans credentials.
    // .RequireAuthorization(); A décommenter par la suite 
    endpoints.MapGraphQL().RequireAuthorization();


    endpoints.MapBananaCakePop("/ui").WithOptions(new GraphQLToolOptions
    {
        GraphQLEndpoint = "graphql"
    });
});

app.Run();
