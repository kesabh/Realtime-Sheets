const express = require("express") ; 
let app = express() ; 

let {Server} = require("socket.io") ; 
const http = require("http") ; 
const server = http.createServer(app) ; 

const io = new Server(server) ; 

app.use(express.static("public"));

let users = [ ] ; 

io.on("connection", function(socket){
    console.log(socket.id + "  connected!")

    socket.on("userConnected", function(username){
        let userObj = {id : socket.id , username : username} ; 
        users.push(userObj) ; 
        console.log(users) ; 
    }) ; 

    socket.on("cellFocussed", function(cellData){
        socket.broadcast.emit("cellFocussed" , cellData) ;         
    })

    socket.on("cellValueChanged", function(dataObject){
        socket.broadcast.emit("cellValueChanged", dataObject) ; 
    })
})




// let port = process.env.PORT || 5500;
server.listen(5500, function () {
    console.log("Server started at port :  " + 5500);
});
