import io from 'socket.io-client'

const URL = "http://localhost:5000/"

const sock = io(URL);

var socketID;

sock.on("createNewGame", statusUpdate => {
    console.log("A new game has been created! Username: " + statusUpdate.userName + ", Game id: " + statusUpdate.gameId + " Socket id: " + statusUpdate.mySocketId)
    socketID = statusUpdate.mySocketId
})

export {
    sock,
    socketID
}