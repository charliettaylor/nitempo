# Routes

## Auth
- POST - /getUserById `{ userID: string }`

- POST - /spotifyLogin `{}`

- POST - /callback for Spotify API ***only***

- POST - /followerCount `{ userID: string }`

- POST - /followingCount `{ userID: string }`

## Post
- POST - /create `{ userID: string, description: string, type: string, musicID: string }`

- POST - /get `{}`

- GET - /getUser `{ userID: string }`

- PATCH - /update `{ userID: string, desc: string }`

- DELETE - /delete `{ postID: string }`

- POST - /feed `{ userID: string }`

## Spotify
- POST - /getMe `{ accessToken: string }`

- POST - /getPlaylists `{ accessToken: string, refreshToken: string }`

- POST - /refreshTokens `{ accessToken: string, refreshToken: string }`

- POST - /search `{ accessToken: string, refreshToken: string, query : string }`