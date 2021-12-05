# Routes

## Auth
- GET - /getUserById `{ userID: string }`

- GET - /spotifyLogin `{}`

- GET - /callback for Spotify API only

- GET - /followerCount `{ userID: string }`

- GET - /followingCount `{ userID: string }`

## Post
- POST - /create `{ userID: string, description: string, type: string, musicID: string }`

- GET - /get `{}`

- GET - /getUser `{ userID: string }`

- PATCH - /update `{ userID: string, desc: string }`

- DELETE - /delete `{ postID: string }`

- GET - /feed `{ userID: string }`

## Spotify
- GET - /getMe `{ userID: string }`

- GET - /getPlaylists `{ userID: string }`

- GET - /refreshTokens `{ userID : string }`

- GET - /search `{ query : string }`