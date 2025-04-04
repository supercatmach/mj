const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const helmet = require("helmet");  // 引入 helmet

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",  // 允許所有來源
        methods: ["GET", "POST"]
    }
});

// 使用 helmet 設定 CSP
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", "https://catchat-a7zb.onrender.com", "https://mj-5x4w.onrender.com", "wss://mj-5x4w.onrender.com"],
      // 其他 CSP 設定
    },
  })
);

const rooms = {};  // { roomId: { host: socket.id, players: 1 } }
rooms["025024"] = { host: "貓貓", players: [] ,alps:0,epgh:[],pled:0,allmgd:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]};

io.on("connection", (socket) => {

    console.log("新玩家連線:", socket.id);


    // 玩家創建房間
    socket.on("createRoom", () => {
        const roomId = socket.id;  // 直接用 socket.id 當作房間 ID
        rooms[roomId] = { host: socket.id, players: [] ,alps:0,epgh:[],pled:0,allmgd:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]};
        socket.join(roomId);
        io.emit("updateRooms", rooms);  // 通知所有人更新房間清單
        socket.emit("roomCreated", { roomId });
        console.log(`房間 ${roomId} 創建成功`);
    });

    // 玩家加入房間
    socket.on("joinRoom", (roomId) => {
        if (!rooms[roomId] || rooms[roomId].players.length >= 4) {
            socket.emit("roomFull");
            return;
        }

        rooms[roomId].players.push(socket.id);
        socket.join(roomId);
        io.to(roomId).emit("playerJoined", { playerId: socket.id, roomSize: rooms[roomId].players.length });
        io.emit("updateRooms", rooms);  // 通知所有人更新房間清單
        console.log(`玩家 ${socket.id} 加入房間 ${roomId}`);
        if (rooms[roomId].players.length == 4) {
            befgame(roomId)
            return;
        }
    });

    // 玩家離開或斷線
socket.on("disconnect", () => {
    for (const roomId in rooms) {
        if (rooms[roomId].host === socket.id || io.sockets.adapter.rooms.get(roomId)?.size === 0) {
            delete rooms[roomId];  // 如果房間沒人就刪除
        } else {
            // 移除該玩家
            rooms[roomId].players = rooms[roomId].players.filter(playerId => playerId !== socket.id);
        }
    }
    io.emit("updateRooms", rooms);  // 更新房間清單
    console.log(`玩家 ${socket.id} 斷線，更新房間`);
});

    // 獲取房間清單
    socket.on("getRooms", () => {
        socket.emit("updateRooms", rooms);
    });


function befgame(roominf){

roomId=roominf

rooms[roomId].allmgd=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
rooms[roomId].alps=0
rooms[roomId].epgh=[]
rooms[roomId].pled=0
rooms[roomId].epghpk=[]
rooms[roomId].players2=[]

    for (let i = 4 - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // 產生 0 到 i 之間的隨機索引
        [rooms[roomId].players[i], rooms[roomId].players[j]] = [rooms[roomId].players[j], rooms[roomId].players[i]]; // 交換位置
    }

sratgame(roomId)

}

socket.on("myname", (mtd) => {

io.to(socket.id).emit("myname", JSON.stringify([socket.id,rooms[roomId].players]));

})

socket.on("epghpk", (epghpkinf) => {

roomId=JSON.parse(epghpkinf)[0]
mrs=JSON.parse(epghpkinf)[1]///返回的層級


if(mrs==3){

rooms[roomId].players2=rooms[roomId].players.concat(rooms[roomId].players)

mrs+=rooms[roomId].players2.indexOf(socket.id,rooms[roomId].pled)

}

rooms[roomId].epghpk.push(mrs)


})

socket.on("eat", (canephinf) => {

roomId=JSON.parse(canephinf)[0]
card=JSON.parse(canephinf)[1]

console.log("吃"+card)

rooms[roomId].epgh.push({"num":1,"ple":socket.id,"mtd":card,"dwo":"eat"})

})

socket.on("pon", (canephinf) => {

roomId=JSON.parse(canephinf)[0]
card=JSON.parse(canephinf)[1]

console.log("碰"+card)

rooms[roomId].epgh.push({"num":2,"ple":socket.id,"mtd":card,"dwo":"pon"})

})

socket.on("gun", (canephinf) => {

roomId=JSON.parse(canephinf)[0]
card=JSON.parse(canephinf)[1]

console.log("槓"+card)

rooms[roomId].epgh.push({"num":2,"ple":socket.id,"mtd":card,"dwo":"gun"})

})

socket.on("tin", (canephinf) => {

roomId=JSON.parse(canephinf)[0]
card=JSON.parse(canephinf)[1]

io.to(roomId).emit("caneph", JSON.stringify([socket.id,card,"tin"]));

})

socket.on("win", (canephinf) => {

roomId=JSON.parse(canephinf)[0]
card=JSON.parse(canephinf)[1]

mra=3

rooms[roomId].players2=rooms[roomId].players.concat(rooms[roomId].players)

mra+=rooms[roomId].players2.indexOf(socket.id,rooms[roomId].pled)

rooms[roomId].epgh.push({"num":mra,"ple":socket.id,"mtd":card,"dwo":"win"})

})

function sratgame(roominf){

roomId=roominf

for(let t=0;t<4;t++){

for(let s=0;s<rooms[roomId].players.length;s++){

plmgdnew=[]

for(let i=0;i<4;i++){

var n = Math.floor(Math.random() * 42)+1;///

while(n<=34&&rooms[roomId].allmgd[n]>3||n>34&&rooms[roomId].allmgd[n]>0){///抽出一開始的16張牌(不能重覆)

var n = Math.floor(Math.random() * 42)+1;///

}
rooms[roomId].allmgd[n]++

plmgdnew.push(n)

}

console.log("發送給玩家:"+rooms[roomId].players[s]+"手牌:"+plmgdnew)

io.to(rooms[roomId].players[s]).emit("star", JSON.stringify(plmgdnew));

}

}

var n = Math.floor(Math.random() * 42)+1;///

while(n<=34&&rooms[roomId].allmgd[n]>3||n>34&&rooms[roomId].allmgd[n]>0){///抽出一開始的16張牌(不能重覆)

var n = Math.floor(Math.random() * 42)+1;///

}
rooms[roomId].allmgd[n]++

io.to(roomId).emit("getnewcard2", JSON.stringify(rooms[roomId].players[0]));

io.to(rooms[roomId].players[0]).emit("getnewcard", JSON.stringify(n));

}

////////

socket.on("getnewcard", (roomIdinf) => {

roomId=JSON.parse(roomIdinf)[0]
card=JSON.parse(roomIdinf)[1]

rooms[roomId].epgh=[]

if(card>35){///補花

io.to(roomId).emit("flower", JSON.stringify([socket.id ,card]));

console.log("玩家:"+socket.id+"補花"+card)

}

var n = Math.floor(Math.random() * 42)+1;///

while(n<=34&&rooms[roomId].allmgd[n]>3||n>34&&rooms[roomId].allmgd[n]>0){///抽出一開始的16張牌(不能重覆)

var n = Math.floor(Math.random() * 42)+1;///

}

rooms[roomId].allmgd[n]++

console.log("發送給玩家:"+socket.id+"牌:"+n)

if(card=="new"){

io.to(roomId).emit("getnewcard2", JSON.stringify(socket.id));

}

io.to(socket.id).emit("getnewcard", JSON.stringify(n));

rooms[roomId].pled=rooms[roomId].players.indexOf(socket.id)

});

///////////////////////////////////////////////////////

socket.on("outcard", (roomIdinf) => {

roomId=JSON.parse(roomIdinf)[0]
card=JSON.parse(roomIdinf)[1]

rooms[roomId].epgh=[]
rooms[roomId].epghpk=[]

console.log("玩家:"+socket.id+"打出牌:"+card)

io.to(roomId).emit("outcard", JSON.stringify([socket.id ,card]));

rooms[roomId].alps=0

});



socket.on("needgetcard", (roomIdinf) => {

rooms[roomId].alps++

roomId=JSON.parse(roomIdinf)[0]
ple=JSON.parse(roomIdinf)[1]

btop=0

console.log(rooms[roomId].epghpk,rooms[roomId].alps,rooms[roomId].epgh)

if(rooms[roomId].epghpk.length!=0){

btop=Math.max(...Object.values(rooms[roomId].epghpk))

if(rooms[roomId].alps==4&&rooms[roomId].epgh.length!=0||rooms[roomId].epgh.num>=btop&&rooms[roomId].epgh.length!=0){

rooms[roomId].epgh.sort(function (a, b) {///

return b.num - a.num

});

io.to(roomId).emit("caneph", JSON.stringify([rooms[roomId].epgh[0].ple,rooms[roomId].epgh[0].mtd,rooms[roomId].epgh[0].dwo]));

rooms[roomId].epghpk=[]

return

}

}

if(rooms[roomId].alps==4&&rooms[roomId].epgh.length==0){

let nexpled=(rooms[roomId].players.indexOf(ple)+1<rooms[roomId].players.length)?rooms[roomId].players[rooms[roomId].players.indexOf(ple)+1]:rooms[roomId].players[0]

io.to(nexpled).emit("needgetcard", (""));

}

});



});


////////////////////////////////////////////////貓咪/////////////////////////////////////////////

// 儲存所有訊息
let messages = [];

allplayer=[]

io.on("connection", (socket) => {
    

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
