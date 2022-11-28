# domshyra
personal website

might have to run `dotnet dev-certs https --trust` for api


`dotnet user-secrets init`
`dotnet user-secrets set "SecretValues:SecretClientID" "SpotifyClientId"`
`dotnet user-secrets set "SecretValues:SecretClientSecret" "SpotifyClientSecret"`


written in .Net and react



Spotify will only with a usersecrets file containing 

`{
  "SecretValues:SecretClientID": "SpotifyClientId",
  "SecretValues:SecretClientSecret": "SpotifyClientSecret"
}
`
