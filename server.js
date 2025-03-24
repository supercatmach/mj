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

allplayer=[]

io.on("connection", (socket) => {
    console.log(`玩家已連線: ${socket.id}`);

socket.on("move", (movnew) => {

JSON.parse

for(let i=0;i<allplayer.length;i++){

if(allplayer[i].ids==socket.id){

allplayer[i].inX=JSON.parse(movnew)[0]

allplayer[i].inY=JSON.parse(movnew)[1]

io.emit("move", JSON.stringify([socket.id,JSON.parse(movnew)[0],JSON.parse(movnew)[1]]));

break

}

}

});



    // 監聽訊息發送事件
socket.on("name", (pled) => {

for(let s=0;s<allplayer.length;s++){

io.to(socket.id).emit("pledlined",JSON.stringify(allplayer[s]));

}

io.emit("pledonline", JSON.stringify([pled,socket.id]));

allplayer.push({"name":pled,"ids":socket.id,"inX":"250px","inY":"250px"})

});

    // 監聽訊息發送事件
    socket.on("message", (msg) => {

        console.log(socket.id+`說: ${msg}`);

        // 廣播訊息給所有玩家
        io.emit("message", JSON.stringify([socket.id,msg]));
    });

    socket.on("disconnect", () => {

for(let i=0;i<allplayer.length;i++){

if(allplayer[i].ids==socket.id){

delete allplayer[i]

allplayer=allplayer.filter(el => el);

break

}

}
io.emit("pledoffline", JSON.stringify(socket.id));

        console.log(`玩家已斷線: ${socket.id}`);
    });
});

const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
    console.log(`伺服器運行中： http://localhost:${PORT}`);
});
