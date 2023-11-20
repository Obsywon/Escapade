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

namespace AzureFunctionEscapade
{
    public class ControllerUser
    {
        private readonly IUserService _userService;
        public ControllerUser(IUserService userService)
        {
            _userService = userService;
        }

        [FunctionName("CreateUser")]
        [OpenApiOperation(operationId: "Run", tags: new[] { "CreateUser" })]
        [OpenApiSecurity("function_key", SecuritySchemeType.ApiKey, Name = "code", In = OpenApiSecurityLocationType.Query)]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.Created, contentType: "text/plain", bodyType: typeof(string), Description = "The OK response")]
        [OpenApiRequestBody(
        "application/json",
        typeof(User),
        Description = "The user to create.")]
        public async Task<IActionResult> CreateUser([HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "users")] HttpRequest req,
            ILogger log)
        {
            var userJson = await req.ReadAsStringAsync();

            try
            {
                var user = JsonConvert.DeserializeObject<User>(userJson);

                if (await _userService.CheckForConflictingUser(user))
                {
                    return new ConflictObjectResult($"User with matching email exists : \"{user.Email}\"");
                }

                user.Password = await _userService.EncryptPassword(user);
                await _userService.Create(user);

                return new OkObjectResult(user);
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
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "text/plain", bodyType: typeof(string), Description = "The OK response")]
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
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "text/plain", bodyType: typeof(string), Description = "The OK response")]
        public async Task<IActionResult> GetUserById([HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "users/{id}")] HttpRequest req,
            ILogger log, string id)
        {
            try
            {
                var user = await _userService.GetById(id);

                if (user == null)
                {
                    return new UnprocessableEntityObjectResult($"No user exists with id: {id}");
                }

                return new OkObjectResult(user);
            }
            catch (Exception e)
            {
                var errorMessage = $"Failed to fetch the user with id : {id}";

                log.LogError(e, errorMessage);
                return new InternalServerErrorResult();
            }
        }

        [FunctionName("UpdateUser")]
        [OpenApiOperation(operationId: "Run", tags: new[] { "UpdateUser" })]
        [OpenApiSecurity("function_key", SecuritySchemeType.ApiKey, Name = "code", In = OpenApiSecurityLocationType.Query)]
        [OpenApiParameter(name: "id", In = ParameterLocation.Path, Required = true, Type = typeof(string), Description = "L'identifiant de l'utilisateur")]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "text/plain", bodyType: typeof(string), Description = "The OK response")]
        public async Task<IActionResult> UpdateUser([HttpTrigger(AuthorizationLevel.Anonymous, "put", Route = "users/{id}")] HttpRequest req,
            ILogger log, string id)
        {
            var userJson = await req.ReadAsStringAsync();

            try
            {
                var user = JsonConvert.DeserializeObject<User>(userJson);
                user.Id = id;

                await _userService.Update(user);

                return new OkObjectResult(user);
            }
            catch (Exception e)
            {
                var errorMessage = $"Failed to update book with id: {id} with details: {userJson}";

                log.LogError(e, errorMessage);
                return new BadRequestObjectResult(errorMessage);
            }
        }

        [FunctionName("DeleteUser")]
        [OpenApiOperation(operationId: "Run", tags: new[] { "DeleteUser" })]
        [OpenApiSecurity("function_key", SecuritySchemeType.ApiKey, Name = "code", In = OpenApiSecurityLocationType.Query)]
        [OpenApiParameter(name: "id", In = ParameterLocation.Path, Required = true, Type = typeof(string), Description = "L'identifiant de l'utilisateur")]
        [OpenApiResponseWithBody(statusCode: HttpStatusCode.NoContent, contentType: "text/plain", bodyType: typeof(string), Description = "The OK response")]
        public async Task<IActionResult> DeleteUser([HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = "users/{id}")] HttpRequest req,
            ILogger log, string id)
        {
            try
            {
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
