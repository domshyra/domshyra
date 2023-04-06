[![Web](https://github.com/domshyra/domshyra/actions/workflows/main_domshyraweb.yml/badge.svg?branch=main)](https://github.com/domshyra/domshyra/actions/workflows/main_domshyraweb.yml) [![Api](https://github.com/domshyra/domshyra/actions/workflows/main_domshyraapi.yml/badge.svg)](https://github.com/domshyra/domshyra/actions/workflows/main_domshyraapi.yml)
# domshyra 
Grabs spotify playlists based on appsettings `Spotify:Username` value.

Written in .Net and react

deployed to https://www.domshyra.com

## Getting Started

### API
might have to run `dotnet dev-certs https --trust` for api

Spotify will only work with a usersecrets file containing 

```json
{
  "Spotify:ClientId": "SpotifyClientId",
  "Spotify:ClientSecret": "SpotifyClientSecret"
}
```

run the following commands to add secrets.

`dotnet user-secrets init`

`dotnet user-secrets set "Spotify:ClientId" "SpotifyClientId"`

`dotnet user-secrets set "Spotify:ClientSecret" "SpotifyClientSecret"`

inorder to use the rating features on play list run `dotnet ef database update`

in vscode use ".NET core launch"


### Web
run `npm install`
in vscode use "Launch Chrome against localhost" or run `npm start` 





