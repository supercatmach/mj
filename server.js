const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// 儲存所有訊息
let messages = [];
allplayer=[{"name":"Arret","id":"X0"}]

io.on("connection", (socket) => {
    console.log(`玩家已連線: ${socket.id}`);

    // 監聽訊息發送事件
    socket.on("name", (pled) => {

        allplayer.push({"name":pled,"id":socket.id});
        // 有玩家上線
        io.emit("pledonline", pled);
    });

    // 監聽訊息發送事件
    socket.on("message", (msg) => {

speakpled=""

for(let i=0;i<allplayer.length;i++){

if(allplayer[i].id==socket.id){

speakpled=allplayer[i].name

break

}

}
        console.log(speakpled+`說: ${msg}`);

        // 廣播訊息給所有玩家
        io.emit("message", speakpled+":"+msg);
    });

    socket.on("disconnect", () => {

for(let i=0;i<allplayer.length;i++){

if(allplayer[i].id==socket.id){

delete allplayer[i]

allplayer.filter(el => el);

break

}

}
        console.log(`玩家已斷線: ${socket.id}`);
    });
});

const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
    console.log(`伺服器運行中： http://localhost:${PORT}`);
});
