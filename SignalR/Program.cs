using ChatService.Hubs;
using SignalR.Models;

var builder = WebApplication.CreateBuilder(args);

//Adding SignalR
builder.Services.AddSignalR();



//CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
        builder => builder
        .WithOrigins("http://localhost:3000/")
        .AllowCredentials()
        .AllowAnyMethod()
        .AllowAnyHeader()
        .SetIsOriginAllowed(origin => true)
        .WithExposedHeaders("*")
        );
});

builder.Services.AddSingleton<IDictionary<string, UserConnection>>(options => new Dictionary<string, UserConnection>());

var app = builder.Build();


app.UseRouting();
app.UseCors("CorsPolicy");
app.UseEndpoints(endpoints =>
{
    endpoints.MapHub<Chathub>("/chat");
});

app.Run();
