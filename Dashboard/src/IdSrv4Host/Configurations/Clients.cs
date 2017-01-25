using IdentityServer4.Models;
using System.Collections.Generic;

namespace IdSrv4Host.Configurations
{
    public class Clients
    {        
        // clients want to access resources (aka scopes)
        public static IEnumerable<Client> Get()
        {
            // clients credentials
            return new List<Client>
            {
                new Client
                {
                    ClientName = "angular2client",
                    ClientId = "angular2client",
                    AccessTokenType = AccessTokenType.Reference,
                    //AccessTokenLifetime = 600, // 10 minutes, default 60 minutes
                    AllowedGrantTypes = GrantTypes.Implicit,
                    AllowAccessTokensViaBrowser = true,
                    RedirectUris = new List<string>
                    {
                        "http://localhost:52010"
                    },
                    PostLogoutRedirectUris = new List<string>
                    {
                        "http://localhost:52010/Unauthorized"
                    },
                    AllowedCorsOrigins = new List<string>
                    {
                        "https://localhost:52010",
                        "http://localhost:52010"
                    },
                    AllowedScopes = new List<string>
                    {
                        "openid",
                        "dataEventRecords",
                        "dataeventrecordsscope",
                        "securedFiles",
                        "securedfilesscope",
                        "role"
                    }
                }
            };
        }
    }
}
