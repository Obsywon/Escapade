using AzureFunctionEscapade.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Threading.Tasks;
using AzureFunctionEscapade.Models;
using System.Web.Http;
using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Attributes;
using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Enums;
using Microsoft.OpenApi.Models;
using System.Net;
using Swashbuckle.AspNetCore.Annotations;
using HotChocolate.AzureFunctions;
using Microsoft.AspNetCore.JsonPatch;
using System.Collections.Generic;
using FirebaseAdminAuthentication.DependencyInjection.Services;
using Microsoft.AspNetCore.Authentication;

namespace AzureFunctionEscapade
{
    public class ControllerUser
    {

        private readonly IUserService _userService;
        private readonly FirebaseAuthenticationFunctionHandler _authenticationHandler;
        public ControllerUser(
            IUserService userService,
            FirebaseAuthenticationFunctionHandler authenticationHandler)
        {
            _userService = userService;
            _authenticationHandler = authenticationHandler;
        }

        [FunctionName("ControllerUser")]
        public async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = "graphql")] HttpRequest req,
        [GraphQL] IGraphQLRequestExecutor executor,
        ILogger log)
        {
            //log.LogInformation("C# HTTP trigger function processed a request.");

            AuthenticateResult authenticationResult = await _authenticationHandler.HandleAuthenticateAsync(req);

            if (!authenticationResult.Succeeded)
            {
                return new UnauthorizedResult();
            }

            return await executor.ExecuteAsync(req);

            //return new NoContentResult();
        }
        
       
        [FunctionName("CreateUser")]
        [OpenApiOperation(operationId: "Run", tags: new[] { "CreateUser" })]
        [OpenApiSecurity("function_key", SecuritySchemeType.ApiKey, Name = "code", In = OpenApiSecurityLocationType.Query)]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.Created, contentType: "application/json", bodyType: typeof(string), Description = "The Created response")]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.Conflict, contentType: "application/json", bodyType: typeof(string), Description = "The Conflict response")]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.BadRequest, contentType: "application/json", bodyType: typeof(string), Description = "The Bad Request response")]
        [OpenApiRequestBody("application/json", typeof(User), Description = "The user to create.")]
        public async Task<IActionResult> CreateUser([HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "users")] HttpRequest req,
            ILogger log)
        {
            var userJson = await req.ReadAsStringAsync();

            try
            {
                var user = JsonConvert.DeserializeObject<User>(userJson);

                if (!_userService.IsEmailFormatValid(user))
                    return new ConflictObjectResult($"Invalid email : \"{user.Email}\"");

                if (await _userService.CheckForConflictingUser(user))
                    return new ConflictObjectResult($"User with matching email exists : \"{user.Email}\"");

                if (!_userService.IsNameOrLastNameValid(user))
                    return new ConflictObjectResult($"Invalid name or lastname : \"{user.Name} {user.LastName}\"");

                if (!_userService.IsPasswordSecure(user))
                {
                    string msg = "Password must be at least :";
                    msg += "\n 8 characters";
                    msg += "\n 1 capital letter";
                    msg += "\n 1 lowercase letter";
                    msg += "\n 1 digit";
                    return new ConflictObjectResult(msg);
                }

                user.Password = await _userService.EncryptPassword(user);
                await _userService.Create(user);

                return new CreatedResult($"api/users/{user.Id}", user);
            }
            catch (Exception e)
            {
                var errorMessage = $"Failed to create a user: {userJson}";

                log.LogError(e, errorMessage);
                return new BadRequestObjectResult(errorMessage);
            }
        }

        [FunctionName("GetUsers")]
        [OpenApiOperation(operationId: "Run", tags: new[] { "GetUsers" })]
        [OpenApiSecurity("function_key", SecuritySchemeType.ApiKey, Name = "code", In = OpenApiSecurityLocationType.Query)]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "application/json", bodyType: typeof(List<User>), Description = "The OK response")]
        public async Task<IActionResult> GetUsers([HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "users")] HttpRequest req,
            ILogger log)
        {
            try
            {
                var users = await _userService.GetAll();

                return new OkObjectResult(users);
            }
            catch (Exception e)
            {
                var errorMessage = $"Failed to fetch all users";

                log.LogError(e, errorMessage);
                return new InternalServerErrorResult();
            }
        }

        [FunctionName("GetUserById")]
        [OpenApiOperation(operationId: "Run", tags: new[] { "GetUserById" })]
        [OpenApiSecurity("function_key", SecuritySchemeType.ApiKey, Name = "code", In = OpenApiSecurityLocationType.Query)]
        [OpenApiParameter(name: "id", In = ParameterLocation.Path, Required = true, Type = typeof(string), Description = "L'identifiant de l'utilisateur")]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "application/json", bodyType: typeof(User), Description = "The OK response")] 
        public async Task<IActionResult> GetUserById([HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "users/{id}")] HttpRequest req,
            ILogger log, string id)
        {
            try
            {
                var user = await _userService.GetById(id);

                if (user == null)
                    return new UnprocessableEntityObjectResult($"No user exists with id: {id}");

                return new OkObjectResult(user);
            }
            catch (Exception e)
            {
                var errorMessage = $"Failed to fetch the user with id : {id}";

                log.LogError(e, errorMessage);
                return new InternalServerErrorResult();
            }
        }

        [FunctionName("UpdateUserPost")]
        [OpenApiOperation(operationId: "Run", tags: new[] { "UpdateUserPost" })]
        [OpenApiSecurity("function_key", SecuritySchemeType.ApiKey, Name = "code", In = OpenApiSecurityLocationType.Query)]
        [OpenApiParameter(name: "id", In = ParameterLocation.Path, Required = true, Type = typeof(string), Description = "L'identifiant de l'utilisateur")]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "application/json", bodyType: typeof(User), Description = "The OK response")]
        [OpenApiRequestBody("application/json", typeof(User), Description = "The user to update.")]
        public async Task<IActionResult> UpdateUserPost([HttpTrigger(AuthorizationLevel.Anonymous, "put", Route = "users/{id}")] HttpRequest req,
            ILogger log, string id)
        {
            var userJson = await req.ReadAsStringAsync();

            try
            {
                var user = await _userService.GetById(id);

                if (user == null)
                    return new UnprocessableEntityObjectResult($"No user exists with id: {id}");

                user = JsonConvert.DeserializeObject<User>(userJson);

                await _userService.Update(user);

                return new OkObjectResult(user);
            }
            catch (Exception e)
            {
                var errorMessage = $"Failed to update user with id: {id} with details: {userJson}";

                log.LogError(e, errorMessage);
                return new BadRequestObjectResult(errorMessage);
            }
        }

        [FunctionName("UpdateUserPatch")]
        [OpenApiOperation(operationId: "Run", tags: new[] { "UpdateUserPatch" })]
        [OpenApiSecurity("function_key", SecuritySchemeType.ApiKey, Name = "code", In = OpenApiSecurityLocationType.Query)]
        [OpenApiParameter(name: "id", In = ParameterLocation.Path, Required = true, Type = typeof(string), Description = "L'identifiant de l'utilisateur")]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "application/json", bodyType: typeof(User), Description = "The OK response")]
        [OpenApiRequestBody("application/json", typeof(JsonPatchDocument<User>), Description = "The patch document for updating the user.")]
        public async Task<IActionResult> UpdateUserPatch([HttpTrigger(AuthorizationLevel.Anonymous, "patch", Route = "users/{id}")] HttpRequest req,
        ILogger log, string id)
        {
            var patchDocumentJson = await req.ReadAsStringAsync();

            try
            {
                var user = await _userService.GetById(id);

                if (user == null)
                    return new UnprocessableEntityObjectResult($"No user exists with id: {id}");

                var patchDocument = JsonConvert.DeserializeObject<JsonPatchDocument<User>>(patchDocumentJson);

                // Appliquer le document de patch à l'utilisateur existant
                patchDocument.ApplyTo(user);

                await _userService.Update(user);

                return new OkObjectResult(user);
            }
            catch (Exception e)
            {
                var errorMessage = $"Failed to update user with id: {id} with patch details: {patchDocumentJson}";

                log.LogError(e, errorMessage);
                return new BadRequestObjectResult(errorMessage);
            }
        }

        [FunctionName("DeleteUser")]
        [OpenApiOperation(operationId: "Run", tags: new[] { "DeleteUser" })]
        [OpenApiSecurity("function_key", SecuritySchemeType.ApiKey, Name = "code", In = OpenApiSecurityLocationType.Query)]
        [OpenApiParameter(name: "id", In = ParameterLocation.Path, Required = true, Type = typeof(string), Description = "L'identifiant de l'utilisateur")]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.NoContent, contentType: "application/json", bodyType: typeof(string), Description = "The OK response")]
        public async Task<IActionResult> DeleteUser([HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = "users/{id}")] HttpRequest req,
            ILogger log, string id)
        {
            try
            {

                var user = await _userService.GetById(id);

                if (user == null)
                    return new UnprocessableEntityObjectResult($"No user exists with id: {id}");

                await _userService.Delete(id);

                return new NoContentResult();
            }
            catch (Exception e)
            {
                var errorMessage = $"Failed to delete user with id: {id}";

                log.LogError(e, errorMessage);
                return new InternalServerErrorResult();
            }
        }
        

    }
}
