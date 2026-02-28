using backend.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add DbContext
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add controllers
builder.Services.AddControllers();

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:4200") // frontend URL
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials(); // ✅ important
    });
});

var app = builder.Build();

// Use CORS BEFORE authorization & controllers
app.UseCors("AllowFrontend");

app.UseAuthorization();
app.MapControllers();

app.Run();