[![Web](https://github.com/domshyra/domshyra/actions/workflows/web.yml/badge.svg?branch=main)](https://github.com/domshyra/domshyra/actions/workflows/web.yml) [![Api](https://github.com/domshyra/domshyra/actions/workflows/api.yml/badge.svg)](https://github.com/domshyra/domshyra/actions/workflows/api.yml) [![Resources](https://github.com/domshyra/domshyra/actions/workflows/terraform_apply.yml/badge.svg)](https://github.com/domshyra/domshyra/actions/workflows/terraform_apply.yml)
## About me
I’m a full stack software engineer who solves both technical and creative problems. My work spans React, .NET, Azure, SQL, and Terraform, delivering web based SaaS applications that are scalable, intuitive, and impactful. I’ve built tools for companies like Tesla, SpaceX, Nike, Meta, and Intel at Currie & Brown, as well as modernized core systems at WSRB. I believe that design and development are both hard skills, and software should not only works — but should works intuitively and tell a story.

## The code base

Grabs spotify playlists based on appsettings `Spotify:Username` value.

deployed to https://www.domshyra.com


### Tech Stack 

#### Frontend
- **React** with Hooks & Context / Redux (RTK Query for state management)  
- **TypeScript** for fail-fast type safety  
- **UI Libraries**: Material UI  
- **Testing**: Vitest, React Testing Library, Selenium (end-to-end)  

#### Backend
- **.NET 8** (Core)  
- **Entity Framework (Code-First)**  
- **REST APIs** (with authentication via Msal)
- **Testing**: Xunit  

#### Databases
- **SQL Server**  

#### Infrastructure & DevOps
- **Terraform** (Infrastructure as Code for Azure resources)  
- **Github Actions Pipelines (YAML)** for CI/CD  
- **Sentry.io** for monitoring & debugging  (TODO)
- Automated testing pipelines (Selenium, Vitest, Xunit)  


#### How this project has evolved over time 

There are a few examples of how this project has progressed or the other technologies that have improved over time

[Here is a sample version in containers](https://github.com/domshyra-s-playground/containersDemo) 

[Here is a the upgrade to rtkQuery](https://github.com/domshyra-s-playground/rtkQueryDemo) 

Now using terraform for all the resources

### Setup
The [api readme](./Api/README.md#Setup) and [web readme](./Web/README.md#Setup) have more detailed instructions on how to run the project.


#### Running 

After doing each api and web's setup, in vscode use `api & web` to run both the api and web projects at the same time.
