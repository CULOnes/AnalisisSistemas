using RoadMaster;

var builder = WebApplication.CreateBuilder(args);

var startup = new Startup(builder.Configuration);

startup.ConfigureServices(builder.Services);

var app = builder.Build();

startup.ConfigureApplication(app, app.Environment);

app.Run();
