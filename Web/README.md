# About

This project is using [vite](https://vite.dev/) and [vitest](https://vitest.dev/) with [react](https://reactjs.org/) and written in [typescript](https://www.typescriptlang.org/).

## Folder descriptions
**Fragments** – Small, focused building blocks like layout or UI wrappers that serve single, specific purposes.

**Components** – Reusable UI elements built from fragments, with associated prop types defined here for consistency and clarity.

**Sections** – Higher-level UI assemblies made from components and fragments to represent full content sections on a page.

**Page** – Complete pages composed of sections, components, and fragments that users interact with directly.

**Types** – Shared logic and view types for clean, consistent data shaping and easier testing across the codebase.

**__Mocks__** – Centralized mock data and MSW handlers used to support consistent and maintainable test environments.

```
src/
├── Fragments/         # Small, focused building blocks (e.g., Grid, Wrapper)
│   └── Grid.tsx
│
├── Components/        # Reusable UI elements built from fragments
│   ├── SearchBar.tsx
│   └── PropTypes.ts   # Component-specific prop definitions
│
├── Sections/          # Assemblies of components and fragments for full sections
│   └── HeroSection.tsx
│
├── Page/              # Complete, user-facing pages composed of sections and more
│   └── SearchPage.tsx
│
├── Types/             # Shared logic/view types (not prop types)
│   └── SearchTypes.ts
│
└── __Mocks__/         # MSW handlers and test data for consistent test setup
    ├── handlers.ts
    └── mockData.ts
```

# Setup

## Certificates

#### Windows instructions for creating certificates.
1. install chocolatey `https://chocolatey.org/install`
2. then, the actual certificate library, 'choco install mkcert' `do this from admin`

#### Mac and Linux Pre-requisites
1. Install brew if you don't have it. `https://brew.sh/`
2. Install mkcert use `brew install mkcert`

#### To get certificates, you have the following commands.
3. run `mkcert -install` to install the root certificate
4. now run the following to create the actual certificates.


```bash
# Web/
//create a certificate folder
mkdir -p .cert
//create the actual certificates in the folder 
mkcert -key-file ./.cert/key.pem -cert-file ./.cert/cert.pem "localhost"
```

### Running 

After the certs are created, you can run the project using the following command.

```bash
# Web/
npm install
```
once the packages are installed, you are ready to run the project.

```bash
# Web/
npm start
```

this runs the app in the development mode.\
Open [https://localhost:3005](https://localhost:3005) to view it in the browser.


# Env local
for the client secret, you can create a `.env.local` file in the root of the project and add the following line
```
VITE_CLIENT_SECRET==your_client_secret
```