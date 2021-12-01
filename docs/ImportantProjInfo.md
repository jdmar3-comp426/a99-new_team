## List of API endpoints used in the project

Defined in Server.js

1. Endpoint: "/app/verifyLogin". Type: POST. Usage: Used to verify whether password and username exist in our database. User authentication.
2. Endpoint: "/app/register". Type: POST. Usage: Used to register a user (with a unique username) and initialize their data in our database.
3. Endpoint: "/app/getUserData/:userName". Type: GET. Usage: Used to get data for a given user to display his/her dashboard
4. Endpoint: "/app/updateUserData/:userName". Type: UPDATE. Usage: Used to update user data after win/loss/draw in a chess game.
5. Endpoint: "/app/deleteUserData/:userName". Type: DELETE. Usage: Used to delete the account from our database if the user chooses to do so.
6. Endpoint: "/app/users". Type: GET. Usage: Used for development purposes. Allows us to see our whole user database. Helpful while debugging
7. Any other invalid endpoints return a 404 ERROR.


## List of Socket Events sent and listened for

Defined in gameHandler.js

1. 'connection' - Event sent by client when socket connects to server socket
2. 'disconnect' - Event sent by client when client socket disconnects
3. 'new move' - Sent by client that makes a move. Relayed to other opponent
4. 'createNewgame' - Sent by client that wants to start a new game.
5. 'playerJoinGame' - Sent by client that wants to join an existing/valid game
6. 'request opponent username and color for joinee' - Sent by client to get the opponent name and color. So we can infer the clients color
7. 'recieved userName and color from creator'- Server listens for this event to relay the information to the client that requested the information
8. 'game over'- Server listens to this event from clients. Cleans up the Socket room for the game once it is over.
9. 'resign' - Client that chooses to resign sends the event to the server, which relays it to the opponent and game ends for both.


## Information stored for each user in our database

1. 'user' - Stores unique user name
2. 'pass' - Stores password
3. 'elo' - Stores user Chess Rating.
4. 'winsAsWhite', 'winsAsBlack', 'lossesAsWhite', 'lossesAsBlack', 'drawsAsWhite', 'drawsAsBlack' - All store wins,draws and losses for a given color. Used to display statistics on user dashboard.
