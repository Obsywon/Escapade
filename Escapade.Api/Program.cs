using Escapade.Api;
using Escapade.Api.Repositories;
using Escapade.Api.Repositories.Interfaces;
using Escapade.Api.Schema.Mutations;
using Escapade.Api.Schema.Queries;
using Escapade.Api.Services;
using Escapade.Api.Services.Interfaces;
using FirebaseAdmin;
using FirebaseAdminAuthentication.DependencyInjection.Extensions;
using Google.Apis.Auth.OAuth2;
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
        .AddScoped<IRepositoryUser, UserRepository>() // -- UserService
        .AddScoped<IRepositoryPlace, PlaceRepository>() // -- PlaceService
        .AddScoped<IRepositoryJourney, JourneyRepository>() // -- JourneyService

        .AddScoped<IUserService, UserService>() // -- UserQuery & UserMutation
        .AddScoped<IPlaceService, PlaceService>() // -- PlaceQuery & PlaceMutation
        .AddScoped<IJourneyService, JourneyService>() // -- JourneyQuery & JourneyMutation

        .AddHttpContextAccessor();




// Configure HotChocolate
builder.Services
    .AddGraphQLServer()
    .AddTypes()
    .AddMutationType<Mutation>()
    .AddQueryType<Query>()

    .AddMutationConventions(applyToAllMutations: true)

    .RegisterService<IUserService>(ServiceKind.Resolver) // -- UserService
    .RegisterService<IPlaceService>(ServiceKind.Resolver) // -- PlaceService
    .RegisterService<IJourneyService>(ServiceKind.Resolver) // -- JourneyService

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

    endpoints.MapGraphQL();

    //endpoints.MapBananaCakePop("/ui").WithOptions(new GraphQLToolOptions
    //{
    //    GraphQLEndpoint = "/graphql"
    //});
});

app.Run();
