# About

This project is dotnet 9 Authentication is done via Microsoft Identity. The project uses Azure Key Vault for secrets and Azure App Insights for logging. The project is set up to use EF Core with a code-first approach to the database. The project is set up to use xunit for testing.

## Folder descriptions

**Controllers** – http controllers for the API. These are the entry points for the API and handle incoming requests.

**Data** – for ef core context and entities. This is where the ef database context and entity models are defined.

**Migrations** – for ef database migrations. This is where the ef database migrations are stored.

**Models** – models for the API, these can have view models and DTOs. This is where the models for the API are defined that are decoupled from the ef entity context. Can also containt view models to help with the react app.

**Interfaces** – interfaces for the API. This is where the interfaces for the API are defined.

**Services** – services for the API with business logic and tests. This is where the services for the API are defined. These are the classes that contain the business logic for the API and their corresponding tests.

```
Api/
├── Controllers/                # http controllers for the API.
│   ├── HealthController.cs
│   └── ExampleController.cs
├── Data/                       # ef core context and entities
│   ├── Database/               # ef core database context and seed data
│   │   ├── DbContext.cs
│   │   └── SeedData.cs
│   ├── Entities/               # ef core entities
│   │   └── ExampleEntity.cs
│   ├── Migrations/                 # ef database migrations
│   │   ├── SOMEDATE_Init.cs
│   │   ├── SOMEDATE_Init.Designer.cs
│   │   └── DbContextModelSnapshot.cs
├── Models/                     # models for the API, these can have view models and DTOs
│   └── Example.cs
├── Services/                   # services for the API with business logic and tests
│   ├── Examples/
│   │   ├── TestData/
│   │   │   └── ExampleServiceData.cs
│   │   ├── ExampleService.cs
│   │   └── ExampleServiceTest.cs
├── Interfaces/                 # interfaces for the API
│   └── IExampleService.cs
├── Tools/
│   └── MockDbSetHelper.cs
└── Program.cs
```

# Setup

Make sure to have the latest version of the dotnet ef tool. Use command `dotnet tool update --global dotnet-ef` to update. See here for more information [here](https://docs.microsoft.com/en-us/ef/core/cli/dotnet).

Spotify will only work with a usersecrets file containing 

```json
{
  "Spotify:ClientId": "SpotifyClientId",
  "Spotify:ClientSecret": "SpotifyClientSecret"
}
```

## Adding environment variables

-   powershell

```bash
# Api/
$Env:ASPNETCORE_ENVIRONMENT = "Development"
$Env:ASPNETCORE_URLS = "https://localhost:5001;http://localhost:5000"
$Env:VaultUri = "https://RENAME-TO-KEY-VAULT-NAME.vault.azure.net/"
```

-   bash

```bash
# Api/
export ASPNETCORE_ENVIRONMENT=Development
export ASPNETCORE_URLS=https://localhost:5001;http://localhost:5000
export VaultUri=https://RENAME-TO-KEY-VAULT-NAME.vault.azure.net/
```

## adding key vault token

make sure to use the following command to add the key vault token to the project. This will allow the project to access the key vault.

```bash
# Api/
az login
```

if az isn't installed,

-   [mac](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli-macos)
-   [windows](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli-windows)

## Nuget

Run nuget restore to restore the packages for the project. This will restore the packages for the project and add them to the project.

```bash
# Api/
dotnet restore
```

## Database

This project uses a local database

in order to set up the local db run `dotnet ef database update`

## Running the API

First navigate to the api folder

run `dotnet dev-certs https --trust` for api, then add the following environment variable `VaultUri` to the project. If you are not using vscode you will need to add `ASPNETCORE_URLS`, and `ASPNETCORE_ENVIRONMENT` variables. See more below if you are unsure how to do this.

if using vscode, you can run the api by pressing `F5` and selecting the `API` configuration.

now you should be running and see the swagger page.

# Errors

#### Exception has occurred: CLR/Azure.Identity.CredentialUnavailableException

Make sure you use `az login` to login to your azure account. This will allow the app to access the keyvault.

# Additional Resources

## Adding a nuget feed to the project

to do this, run the following command in the terminal:
[source](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-nuget-add-source)

```bash
# Api/
dotnet nuget add source <PACKAGE_SOURCE_PATH> [--name <SOURCE_NAME>] [--username <USER>]
    [--password <PASSWORD>] [--store-password-in-clear-text]
    [--valid-authentication-types <TYPES>] [--configfile <FILE>] [--allow-insecure-connections]
dotnet nuget add source -h|--help
```

example:

```bash
# Api/
dotnet nuget add source "https://api.nuget.org/v3/index.json
on"  --name "nuget.org" --username "domshyra@email.com" --password 'ILOVEBEES'
```

The nuget files should be added via the `Nuget.config` file in the root of the project.

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageSources>
    <add key="nuget.org" value="https://api.nuget.org/v3/index.json" />
  </packageSources>
</configuration>
```

Note: You might get issues restoring from the feed. Nuget will tell you to use this command to authenticate.

```bash
# Api/
dotnet restore --interactive
```

but you cannot run this without the [artifacts-credprovider](https://github.com/Microsoft/artifacts-credprovider) installed.
run the following command to install the credprovider: this should install the credprovider and the framework, net.6 and net.8 stuff.

```bash
# Api/
iex "& { $(irm https://aka.ms/install-artifacts-credprovider.ps1) } -AddNetfx -InstallNet9"
```

## Migrations

-   Navigate to the API folder
-   Run the following command to add a migration

```bash
# Api/
dotnet ef migrations add <migration name> -o .\Data\Migrations
```

-   Run the following command to update the database

```bash
# Api/
dotnet ef database update
```

-   Run the following to remove the last migration, this will pop the last migration off the stack.

```bash
# Api/
dotnet ef migrations remove
```

For more information on how to use the database and ef migrations see [here](https://docs.microsoft.com/en-us/ef/core/managing-schemas/migrations/?tabs=dotnet-core-cli)
