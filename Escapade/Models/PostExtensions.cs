using HotChocolate;
using HotChocolate.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

namespace EscapadeApi.Models
{
    [ExtendObjectType<Post>]
    public class PostExtensions
    {
        [GraphQLType("User!")]
        public async Task<JsonElement> GetUserAsync(
            [Parent] Post post,
            [Service] IHttpClientFactory clientFactory,
            CancellationToken cancellationToken)
        {
            using var client = clientFactory.CreateClient("rest");
            var content = await client.GetByteArrayAsync($"api/users/{post.UserId}", cancellationToken);
            return JsonDocument.Parse(content).RootElement;
        }
    }
}
