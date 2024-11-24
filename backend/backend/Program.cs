using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using dotenv.net;

var builder = WebApplication.CreateBuilder(args);

DotEnv.AutoConfig();

builder.Configuration.AddEnvironmentVariables();


builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});


builder.Services.AddHttpClient();

var app = builder.Build();

app.UseCors("AllowAll");
app.UseRouting();
app.MapControllers();
app.Run();