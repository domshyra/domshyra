# domshyra
personal website written in .Net and react


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





