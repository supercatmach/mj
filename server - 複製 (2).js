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
const rooms = {};  // { roomId: { host: socket.id, players: 1 } }
rooms["025024"] = { host: "貓貓", players: 1 ,allmgd:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]};

io.on("connection", (socket) => {

    console.log("新玩家連線:", socket.id);


    // 玩家創建房間
    socket.on("createRoom", () => {
        const roomId = socket.id;  // 直接用 socket.id 當作房間 ID
        rooms[roomId] = { host: socket.id, players: 1 };
        socket.join(roomId);
        io.emit("updateRooms", rooms);  // 通知所有人更新房間清單
        socket.emit("roomCreated", { roomId });
        console.log(`房間 ${roomId} 創建成功`);
    });

    // 玩家加入房間
    socket.on("joinRoom", (roomId) => {
        if (!rooms[roomId] || rooms[roomId].players >= 4) {
            socket.emit("roomFull");
            return;
        }
        rooms[roomId].players++;
        socket.join(roomId);
        io.to(roomId).emit("playerJoined", { playerId: socket.id, roomSize: rooms[roomId].players });
        io.emit("updateRooms", rooms);  // 通知所有人更新房間清單
        console.log(`玩家 ${socket.id} 加入房間 ${roomId}`);
    });

    // 玩家離開或斷線
    socket.on("disconnect", () => {
        for (const roomId in rooms) {
            if (rooms[roomId].host === socket.id || io.sockets.adapter.rooms.get(roomId)?.size === 0) {
                delete rooms[roomId];  // 如果房間沒人就刪除
            } else {
                rooms[roomId].players--;
            }
        }
        io.emit("updateRooms", rooms);  // 更新房間清單
        console.log(`玩家 ${socket.id} 斷線，更新房間`);
    });

    // 獲取房間清單
    socket.on("getRooms", () => {
        socket.emit("updateRooms", rooms);
    });
});

socket.on("star", (roomId) => {

plmgdnew=[]

for(let i=0;i<4;i++){

var n = Math.floor(Math.random() * 42+1);///

while(n<=34&&rooms[roomId].allmgd[n]>3||n>34&&rooms[roomId].allmgd[n]>0){///抽出一開始的16張牌(不能重覆)

var n = Math.floor(Math.random() * 42+1);///

}
rooms[roomId].allmgd[n]++

plmgdnew.push(n)

}

console.log("發送給玩家:"+socket.id+"手牌:"+plmgdnew)

io.to(socket.id).emit("star", JSON.stringify(plmgdnew));

console.log(rooms[roomId].allmgd)

});


    socket.on("getnewcard", (roomIdinf) => {

roomId=JSON.parse(roomIdinf)[0]
card=JSON.parse(roomIdinf)[1]

if(card>35){///補花

        socket.emit("flower", JSON.stringify([socket.id ,card]));

console.log("玩家:"+socket.id+"補花"+card)

}

var n = Math.floor(Math.random() * 42+1);///

while(n<=34&&rooms[roomId].allmgd[n]>3||n>34&&rooms[roomId].allmgd[n]>0){///抽出一開始的16張牌(不能重覆)

var n = Math.floor(Math.random() * 42+1);///

}
rooms[roomId].allmgd[n]++

plmgdnew.push(n)

}

console.log("發送給玩家:"+socket.id+"手牌:"+plmgdnew)

io.to(socket.id).emit("getnewcard", JSON.stringify(plmgdnew));

        });



////////////////////////////////////////////////貓咪/////////////////////////////////////////////

// 儲存所有訊息
let messages = [];

allplayer=[]

io.on("connection", (socket) => {
    console.log(`玩家已連線: ${socket.id}`);

socket.on("move", (movnew) => {

for(let i=0;i<allplayer.length;i++){

if(allplayer[i].ids==socket.id){

allplayer[i].inX=JSON.parse(movnew)[0]

allplayer[i].inY=JSON.parse(movnew)[1]

io.emit("move", JSON.stringify([socket.id,JSON.parse(movnew)[0],JSON.parse(movnew)[1]]));

break

}

}

});

socket.on("move2", (movnew) => {

io.emit("pizza", JSON.stringify([JSON.parse(movnew)[0],JSON.parse(movnew)[1]]));

for(let i=0;i<allplayer.length;i++){

if(allplayer[i].ids!=socket.id){

allplayer[i].inX=JSON.parse(movnew)[0]

allplayer[i].inY=JSON.parse(movnew)[1]

io.emit("move", JSON.stringify([allplayer[i].ids,JSON.parse(movnew)[0],JSON.parse(movnew)[1]]));

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
