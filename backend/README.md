### Install nuget dependencies
```bash
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet add package Microsoft.AspNetCore.SignalR
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
dotnet add package Swashbuckle.AspNetCore  # For Swagger

dotnet add package Newtonsoft.Json
dotnet add package Microsoft.AspNetCore.Mvc.NewtonsoftJson
```

### Generate migration files:
```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```