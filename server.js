const express = require("express")
const app = express()

var http = require("http");

var fs = require("fs");
//let options = {
  //key: fs.readFileSync('./ssl/key.pem', 'utf8'),
  //cert: fs.readFileSync('./ssl/server.crt', 'utf8')
//}
//let server = https.createServer(options, app).listen(443, () => {
  //console.log("CentraliZr listening at port 443");
//})
 let server = http.createServer(app).listen(80, () => {
   console.log("3000 is running")
 })

const io = require("socket.io")(server)
const { v4: uuidV4 } = require("uuid")

app.set("view engine", "ejs")
app.use(express.static("public"))
app.get("/", (req, res) => {
  res.redirect(`/${uuidV4()}`)
})

app.get("/:room", (req, res) => {
  res.render('room', { roomId: req.params.room })
})

io.on('connection', socket => {
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId)
    socket.to(roomId).emit('user-connected', userId)
  })
})
