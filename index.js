const express = require("express");//peticion de la creacion de express
const app = express();
const http = require("http").Server(app);//funcion al http por socket
const io = require("socket.io")(http);//peticion de los socket tcp

//inicio
app.get("/", function(req, res) {
  res.render("index.ejs");
});
//coneccion a los socket
io.sockets.on("connection", function(socket) {
  socket.on("username", function(username) {
    socket.username = username;
    io.emit("is_online", "🔵 <i>" + socket.username + " se une al chat..</i>");
  });
//desconeccion a los socket
  socket.on("disconnect", function(username) {
    io.emit(
      "is_online",
      "🔴 <i>" + socket.username + " ha dejado el chat ..</i>"
    );
  });
//envio del mensaje a travez del socket
  socket.on("chat_message", function(message) {
    io.emit(
      "chat_message",
      "<strong>" + socket.username + "</strong>: " + message
    );
  });
});
//puerto del socket a usar
const server = http.listen(8080, function() {
  console.log("oyendo en *:8080");
});
