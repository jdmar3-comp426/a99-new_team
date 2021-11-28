

/**
 * Here is where we should register event listeners and emitters. 
 */

 var io;
 var gameSocket;
 // gamesInSession stores an array of all active socket connections
 var gamesInSession = [];
 
 
 const initializeGame = (sio, socket) => {
     /**
      * initializeGame sets up all the socket event listeners. 
      */
 
     // initialize global variables.
     console.log("initialized game!");
     io = sio 
     gameSocket = socket 
 
     // pushes this socket to an array which stores all the active sockets.
     gamesInSession.push(gameSocket);
 
     // Run code when the client disconnects from their socket session. 
     gameSocket.on("disconnect", onDisconnect);
 
     // Sends new move to the other socket session in the same room. 
     gameSocket.on("new move", newMove);
 
     // User creates new game room after clicking 'submit' on the frontend
     gameSocket.on("createNewGame", createNewGame);
 
     // User joins gameRoom after going to a URL with '/game/:gameId' 
     gameSocket.on("playerJoinGame", playerJoinsGame);
 
     gameSocket.on('request opponent username and color for joinee', requestOppInfo);
 
     gameSocket.on('recieved userName and color from creator', recievedOppInfo); 
 }
 
const hello = () => {
    console.log("hello");
}
 
 function playerJoinsGame(idData) {
     /**
      * Joins the given socket to a session with it's gameId
      */
 
     // A reference to the player's Socket.IO socket object
     var sock = this
     
     // Look up the room ID in the Socket.IO manager object.
     var room = io.sockets.adapter.rooms.get(idData.gameId);
    // console.log(room)
 
     // If the room exists...
     if (room === undefined) {
         this.emit('status' , "This game session does not exist." );
         return
     }
     if (room.size < 2) {
         // attach the socket id to the data object.
         idData.mySocketId = sock.id;
 
         // Join the room
         sock.join(idData.gameId);
 
         console.log(room.size)
 
         if (room.size === 2) {
             io.sockets.in(idData.gameId).emit('start game', idData.userName)
         }
 
         // Emit an event notifying the clients that the player has joined the room.
         io.sockets.in(idData.gameId).emit('playerJoinedRoom', idData);
 
     } else {
         // Otherwise, send an error message back to the player.
         this.emit('status' , "There are already 2 people playing in this room." );
     }
 }
 
 
 function createNewGame(gameId) {
     // Return the Room ID (gameId) and the socket ID (mySocketId) to the browser client
     console.log("new game created");
     if(io.sockets.adapter.rooms[gameId])
        this.send("Can't create game");
    else{
        this.emit('createNewGame', {gameId: gameId, mySocketId: this.id});

     // Join the Room and wait for the other player
     this.join(gameId);
    }
     
 }
 
 
 function newMove(move) {
     /**
      * First, we need to get the room ID in which to send this message. 
      * Next, we actually send this message to everyone except the sender
      * in this room. 
      */
     console.log(move);
     const gameId = move.gameId 
     
     io.to(gameId).emit('opponent move', move);
 }
 
 function onDisconnect() {
     var i = gamesInSession.indexOf(gameSocket);
     gamesInSession.splice(i, 1);
 }
 
 
 function requestOppInfo(gameId) {
     io.to(gameId).emit('give userName and Color', this.id);
 }
 
 function recievedOppInfo(data) {
     data.socketId = this.id
     io.to(data.gameId).emit('get Opponent UserName and color', data);
 }

 
module.exports = {initializeGame, hello};