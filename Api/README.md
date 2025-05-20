# About

This project is dotnet 9 Authentication is done via Microsoft Identity. The project uses Azure Key Vault for secrets and Azure App Insights for logging. The project is set up to use EF Core with a code-first approach to the database. The project is set up to use xunit for testing.

## Folder descriptions

**Controllers** – http controllers for the API. These are the entry points for the API and handle incoming requests.

**Data** – for ef core context and entities. This is where the ef database context and entity models are defined.

**Migrations** – for ef database migrations. This is where the ef database migrations are stored.

**Models** – models for the API, these can have view models and DTOs. This is where the models for the API are defined that are decoupled from the ef entity context. Can also contain view models to help with the react app.

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

## Nuget

Run nuget restore to restore the packages for the project. This will restore the packages for the project and add them to the project.

```bash
# Api/
dotnet restore
```
## Adding environment variables

-   powershell

```bash
# Api/
$Env:Spotify:ClientId = "spotify-client-id"
$Env:Spotify:ClientSecret = "spotify-client-secret"
```

-   bash

```bash
# Api/
export Spotify:ClientId=spotify-client-id
export Spotify:ClientSecret=spotify-client-secret
```



## Running the API

First navigate to the api folder

run `dotnet dev-certs https --trust` for api, then add the following environment variable `VaultUri` to the project. If you are not using vscode you will need to add `ASPNETCORE_URLS`, and `ASPNETCORE_ENVIRONMENT` variables. See more below if you are unsure how to do this.

if using vscode, you can run the api by pressing `F5` and selecting the `API` configuration.

now you should be running and see the swagger page.

