### Install nuget dependencies
```bash
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet add package Microsoft.AspNetCore.SignalR
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
dotnet add package Swashbuckle.AspNetCore  # For Swagger

dotnet add package Newtonsoft.Json
dotnet add package Microsoft.AspNetCore.Mvc.NewtonsoftJson
dotnet add package Microsoft.AspNetCore.Identity
```

### Generate migration files:
```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

### Run sql server in docker container using WSL terminal, you might need to add WSL extension in VS Code
```
docker run -e 'ACCEPT_EULA=Y' -e 'MSSQL_SA_PASSWORD=ShoppingDb135' -p 1433:1433 --name ShoppingDb -d mcr.microsoft.com/mssql/server:2022-latest
```

### appsettings.json
```
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost,1433;Database=ShoppingDb;User Id=sa;Password=ShoppingDb135;TrustServerCertificate=True;"
}
```

### Install EF Core tools:
```
dotnet tool install --global dotnet-ef
```

### Run the app
```bash
dotnet watch run
```

### Use swagger
http://localhost:5177/swagger/index.html

