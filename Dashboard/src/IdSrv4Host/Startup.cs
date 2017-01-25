
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using IdSrv4Host.Services;
using IdSrv4.Dal.Entities;
using IdSrv4.Dal;
using IdentityServer4.Services;
using IdSrv4Host.Configurations;
using Microsoft.AspNetCore.Http;
using System.Security.Cryptography.X509Certificates;
using System.IO;
using Microsoft.AspNetCore.Authorization;

namespace IdSrv4Host
{
    public class Startup
    {
        private readonly IHostingEnvironment _environment;

        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

            if (env.IsDevelopment())
            {
                builder.AddUserSecrets();
            }
            _environment = env;
            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var cert = new X509Certificate2(Path.Combine(_environment.ContentRootPath, "damienbodserver.pfx"), "");

            // Add framework services.
            services.AddDbContext<IdSrv4DbContext>(options =>
                options.UseSqlServer(
                    Configuration.GetConnectionString("DefaultConnection"), b => b.MigrationsAssembly("IdSrv4.Dal")));

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<IdSrv4DbContext>()
                .AddDefaultTokenProviders();

            var guestPolicy = new AuthorizationPolicyBuilder()
                  .RequireAuthenticatedUser()
                  .RequireClaim("scope", "dataEventRecords")
                  .Build();

            services.AddAuthorization(options =>
            {
                options.AddPolicy("admin", policyAdmin => {
                    policyAdmin.RequireClaim("role", "admin");
                });
            });

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", builder => builder
                    .WithOrigins("http://localhost:52010/")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
            });



            services.AddMvc();

            // Add application services.
            services.AddTransient<IProfileService, IdentityWithAdditionalClaimsProfileService>();
            services.AddTransient<IEmailSender, AuthMessageSender>();
            services.AddTransient<ISmsSender, AuthMessageSender>();

            services.AddIdentityServer()
                .AddSigningCredential(cert)
                .AddInMemoryIdentityResources(Resources.GetIdentityResources())
                .AddInMemoryApiResources(Resources.GetApiResources())
                .AddInMemoryClients(Clients.Get())
                .AddAspNetIdentity<ApplicationUser>()
                .AddProfileService<IdentityWithAdditionalClaimsProfileService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
                app.UseBrowserLink();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            app.UseIdentity();
            app.UseIdentityServer();

            app.UseCors(builder => builder
                .WithOrigins("http://localhost:52010/")
                .AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowAnyOrigin());

            //app.UseCookieAuthentication(new CookieAuthenticationOptions()
            //{
            //    AuthenticationScheme = "External"
            //});
            app.UseGoogleAuthentication(new GoogleOptions()
            {
                ClientId = "311171908290-cpmqb4j8as2oos13jiffa987lba0q9v2.apps.googleusercontent.com",
                ClientSecret = "2AcL-kp71Wqz2pE2R05E-yCB",
                CallbackPath = new PathString("/signin-google-token"),
                //
                Scope = { "openid", "profile", "email" },
                SaveTokens = true
            });
            app.UseFacebookAuthentication(new FacebookOptions
            {
                AppId = "1740920332895866",
                AppSecret = "8e04ae923a342c3bcbe13039c62143c1",
                Scope = { "email" },
                Fields = { "name", "email" },
                SaveTokens = true,
            });
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
