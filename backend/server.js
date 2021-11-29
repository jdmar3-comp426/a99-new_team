// Define app using express
var express = require("express")
var app = express()
// Require database SCRIPT file
var cors= require("cors");
var db= require("./database.js");
// Require md5 MODULE
var md5=require("md5")
var socket= require("socket.io");

var GameHandler = require('./gameHandler.js');

// Make Express use its own built-in body parser
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set server port
HTTP_PORT=5000;
// Start server
var server= app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

const serverSocket = socket(server, {
	cors: {
	  origin: "http://localhost:3000",
	  methods: ["GET", "POST"]
	}
  });

// READ a list of all users (HTTP method GET) at endpoint /app/users/
app.get("/app/users", (req, res) => {	
	const stmt = db.prepare("SELECT * FROM userinfo").all();
	res.status(200).json(stmt);
});


// // DELETE a single user (HTTP method DELETE) at endpoint /app/delete/user/:id
// app.delete("/app/delete/:id",(req,res)=>{
// 	const stmt = db.prepare("DELETE FROM userinfo WHERE id = ?").run(req.params.id);
// 	res.status(201).json({"message":"1 record deleted: ID %ID% (200)".replace("%ID%",req.params.id)});
// })

app.post("/app/verifyLogin", (req,res)=>{
	//console.log(req);
	const row = db.prepare("SELECT * FROM userinfo WHERE user= ? AND pass = ?").get(req.body.user, md5(req.body.pass));
	//check stmt if there is a match and send response accordingly
    //console.log(row);
	if (row) {
		res.status(201).json({valid: true});
	} else {
		res.status(401).json({valid: false});
	}

});

// register a new user
app.post("/app/register",(req,res)=>{
	//console.log(req);
	const coun = db.prepare("SELECT * FROM userinfo WHERE user = ?").get(req.body.user);
	//console.log(coun);
	if (coun){
		res.status(401).json({valid: false});
	} else{
		const stmt = db.prepare("INSERT INTO userinfo (user,pass,nickname,elo, winsAsWhite, winsAsBlack, lossesAsWhite,lossesAsBlack, drawsAsWhite, drawsAsBlack) VALUES (?,?,?,?,?,?,?,?,?,?)");
		const result= stmt.run(req.body.user, md5(req.body.pass),req.body.nickname,600,0,0,0,0,0,0);
		res.status(201).json({valid: true});
	}
});

// send user dashboard data
app.get('/app/getUserData/:userName',(req,res)=>{
	const data = db.prepare("SELECT * FROM userinfo WHERE user = ?").get(req.params.userName);
	if(data)
		res.status(201).json({'eloRating':data.elo,'winsAsWhite':data.winsAsWhite,'winsAsBlack':data.winsAsBlack, 'lossesAsWhite':data.lossesAsWhite,'lossesAsBlack':data.lossesAsBlack, 'drawsAsWhite':data.drawsAsWhite, 'drawsAsBlack':data.drawsAsBlack});
	else
		res.status(401).json({msg:"Invalid User"})
});


// Update user entry
app.patch("/app/updateUserData/:userName",(req,res)=>{
	const oldData = db.prepare("SELECT * FROM userinfo WHERE user = ?").get(req.params.userName);
	if(oldData){
		const stmt = db.prepare("UPDATE userinfo SET elo = COALESCE(?,elo), winsAsWhite=COALESCE(?,winsAsWhite), winsAsBlack=COALESCE(?, winsAsBlack), lossesAsWhite=COALESCE(?,lossesAsWhite), lossesAsBlack=COALESCE(?,lossesAsBlack), drawsAsWhite=COALESCE(?,drawsAsWhite), drawsAsBlack=COALESCE(?,drawsAsBlack)  WHERE user = ?").run(
			req.body.eloRating+oldData.elo,
			oldData.winsAsWhite+req.body.winsAsWhite, 
			oldData.winsAsBlack+req.body.winsAsBlack,
			oldData.lossesAsWhite+req.body.lossesAsWhite, 
			oldData.lossesAsBlack+req.body.lossesAsBlack, 
			oldData.drawsAsWhite+req.body.drawsAsWhite, 
			oldData.drawsAsBlack+req.body.drawsAsBlack, 
			req.params.userName);
		res.status(201).json({msg:"UserData Updated"});
		console.log('user data updated');
	}
	else{
		console.log('user data not updated');
		console.log('userName:'+req.params.userName);
		res.status(401).json({msg:"Invalid User"});
	}
});


// DELETE a single user (HTTP method DELETE) at endpoint /app/delete/user/:id
app.delete("/app/deleteUserData/:userName",(req,res)=>{
	const stmt = db.prepare("DELETE FROM userinfo WHERE user = ?").run(req.params.userName);
	res.status(201).json({"message":"1 record deleted: UserName %ID% (200)".replace("%ID%",req.params.userName)});
})

// Default response for any other request
app.use(function(req, res){
	res.json({"message":"Endpoint not found. (404)"});
    res.status(404);
});


// socket listens to client connection

serverSocket.on('connection', (client)=>{GameHandler.initializeGame(serverSocket,client)});
