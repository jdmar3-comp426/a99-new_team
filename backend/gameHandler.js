 var io;
 var gameSocket;
 var gamesInSession = [];
 
 
 const initializeGame = (sio, socket) => {
  
     console.log("initialized game!");
     io = sio 
     gameSocket = socket 
 
     gamesInSession.push(gameSocket);
 
     gameSocket.on("disconnect", onDisconnect);
 
     gameSocket.on("new move", newMove);
 
     gameSocket.on("createNewGame", createNewGame);
 
     gameSocket.on("playerJoinGame", playerJoinsGame);
 
     gameSocket.on('request opponent username and color for joinee', requestOppInfo);
 
     gameSocket.on('recieved userName and color from creator', recievedOppInfo);
     
     gameSocket.on('game over', handleGameOver);
     gameSocket.on('resign', handleResign);
 }
 

 function playerJoinsGame(idData) {
     
     var sock = this
     
     var room = io.sockets.adapter.rooms.get(idData.gameId);
 
     if (room === undefined) {
         this.emit('status' , "This game session does not exist." );
         return
     }
     if (room.size < 2) {
         idData.mySocketId = sock.id;
 
         sock.join(idData.gameId);
 
         console.log(room.size)
 
         if (room.size === 2) {
             io.sockets.in(idData.gameId).emit('start game', idData.userName)
         }
 
         io.sockets.in(idData.gameId).emit('playerJoinedRoom', idData);
 
     } else {
         this.emit('status' , "There are already 2 people playing in this room." );
     }
 }
 
 
 function createNewGame(gameId) {
     console.log("new game created");
     if(io.sockets.adapter.rooms.get(gameId))
        this.send("Can't create game");
    else{
        this.emit('createNewGame', {gameId: gameId, mySocketId: this.id});

     this.join(gameId);
    }
     
 }
 
 
 function newMove(move) {
   
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

function handleGameOver(gameId){
    this.leave(gameId);
}

function handleResign(gameId){
    io.to(gameId).emit('opp resign',this.id);
}

 
module.exports = {initializeGame};