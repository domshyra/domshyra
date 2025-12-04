[![Web](https://github.com/domshyra/domshyra/actions/workflows/web.yml/badge.svg?branch=main)](https://github.com/domshyra/domshyra/actions/workflows/web.yml) [![Api](https://github.com/domshyra/domshyra/actions/workflows/api.yml/badge.svg)](https://github.com/domshyra/domshyra/actions/workflows/api.yml) [![Resources](https://github.com/domshyra/domshyra/actions/workflows/terraform_apply.yml/badge.svg)](https://github.com/domshyra/domshyra/actions/workflows/terraform_apply.yml)
# About me

Full stack software engineer with a Bachelors in computer science and 8+ years of experience delivering scalable, cloud-based web applications using React, .NET, Azure, SQL, and Terraform. Known for bridging design and engineering, mentoring developers, and creating intuitive user experiences that drive business value. 
I believe great software tells a story — functional, elegant, and user-centered. I also strongly believe in good quality code top to bottom, like a carpenter making cabinets, it’s essential to have even the unseen screws be designed with consideration and intent. 
I excel at transforming nebulous tasks into well-defined solutions through POCs and design documentation. I present these with clear pros and cons to drive technical direction and mentor the team on the new technologies or approaches being introduced. 
I’ve built tools for companies like Tesla, SpaceX, Nike, Meta, and Intel at Currie & Brown, as well as modernized core systems at WSRB.

# The code base

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
