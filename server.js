const express = require("express");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const helmet = require("helmet");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        "'unsafe-inline'",
        "'unsafe-eval'",
        "https://cdnjs.cloudflare.com",
        "https://cdn.jsdelivr.net"
      ],
      scriptSrcAttr: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:"],
      connectSrc: [
        "'self'",
        "https://mj-5x4w.onrender.com",
        "wss://mj-5x4w.onrender.com",
        "https://catchat-a7zb.onrender.com",
        "wss://catchat-a7zb.onrender.com",
        "https://mj-production-43c2.up.railway.app",
        "wss://mj-production-43c2.up.railway.app"
      ],
      fontSrc: [
        "'self'",
        "https://fonts.googleapis.com",
        "https://fonts.gstatic.com"
      ],
      objectSrc: ["'none'"],
      frameAncestors: ["'self'"]
    }
  })
);

app.get("/ping", (req, res) => {
  res.send("pong");
});

const longCacheFolders = [
  'backg',
  'mach',
  'madh',
  'mati',
  'meup',
  'music',
  'stanbypled',
  'watse',
  'word'
];

// 1. 先設定 longCacheFolders 的靜態路由（長快取）
longCacheFolders.forEach(folder => {
  app.use(`/${folder}`, express.static(path.join(__dirname, 'public', folder), {
    maxAge: '1y',
    immutable: true
  }));
});

// 2. zutop.js 長快取
app.use('/zutop.js', express.static(path.join(__dirname, 'public', 'zutop.js'), {
  maxAge: '1y',
  immutable: true
}));

// 3. 其他靜態檔案用一般快取（或無快取，依需求調整）
// 這裡可以用 maxAge: 0 避免 JS, CSS 快取問題
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: 0
}));

// 4. 根路由不快取 index.html
app.get('/', (req, res) => {
  res.set('Cache-Control', 'no-cache');
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 5. catch-all，非靜態檔案請求回傳 index.html（SPA 用）
// 如果你不是 SPA，可以考慮刪掉這段
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

function createRoomStructure(hostId) {
  return {
    host: hostId,
    players: [],
    allmgd: new Array(43).fill(0),
    epgh: [],
    pled: 0,
    alps: 0,
    epghpk: {},
    players2: [],
    makrs: 0,
    linmrs: 0,
    chnwind: 0,
    junwind: 0,
    win: 0,
  };
}

const rooms = {};
///rooms["025024"] = { host: "貓貓", players: [] ,playerid: []  ,playerpic: [],ynstar:0,ynfriend:0,alps:0,epgh:[],pled:0,allmgd:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]};

io.on("connection", (socket) => {

    console.log("新玩家連線:", socket.id);

io.to(socket.id).emit("hi", socket.id);


    // 玩家創建房間
    socket.on("createRoom", () => {
        const roomId = socket.id;  // 直接用 socket.id 當作房間 ID
        rooms[roomId] = { host: socket.id, players: [] ,playerid: [] ,playerpic: [] ,ynstar:0,ynfriend:0,alps:0,epgh:[],pled:0,allmgd:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]};
        socket.join(roomId);
        io.emit("updateRooms", rooms);  // 通知所有人更新房間清單
        socket.emit("roomCreated", { roomId });
        console.log(`房間 ${roomId} 創建成功`);
    });
    socket.on("waninRoom", () => {

const MAX_PLAYERS = 4;
const preferredCounts = [3, 2, 1,0]; // 優先找人數3，再2，再1

let foundRoomKey = null;

for (const count of preferredCounts) {
  foundRoomKey = Object.entries(rooms).find(
    ([key, room]) => room.players.length === count
  )?.[0];

  if (foundRoomKey) break; // 找到符合條件的房間就跳出
}

if (foundRoomKey) {
  // 找到合適的房間
  socket.emit("roomCreated", { roomId: foundRoomKey });
} else {
  // 沒有合適的房間，創建新房間
        const roomId = socket.id;  // 直接用 socket.id 當作房間 ID
        rooms[roomId] = { host: socket.id, players: [] ,playerid: [] ,playerpic: [] ,ynstar:0,ynfriend:0,alps:0,epgh:[],pled:0,allmgd:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]};
        socket.join(roomId);
        io.emit("updateRooms", rooms);  // 通知所有人更新房間清單
        socket.emit("roomCreated", { roomId });
        console.log(`房間 ${roomId} 創建成功`);
}

    });
    socket.on("createRoom2", () => {
        const roomId = socket.id;  // 直接用 socket.id 當作房間 ID
        rooms[roomId] = { host: socket.id, players: [] ,playerid: [] ,playerpic: [] ,ynstar:0,ynfriend:1,alps:0,epgh:[],pled:0,allmgd:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]};
        socket.join(roomId);
        cleanEmptyRooms()
        io.emit("updateRooms", rooms);  // 通知所有人更新房間清單
        socket.emit("roomCreated", { roomId });
        console.log(`房間 ${roomId} 創建成功`);
    });
    // 玩家加入房間
    socket.on("joinRoom", (roomId) => {
        if (!rooms[roomId] || rooms[roomId].players.length >= 4||rooms[roomId].ynstar==1) {
            socket.emit("roomFull");
            return;
        }

        rooms[roomId].players.push(socket.id);
        socket.join(roomId);
        io.to(socket.id).emit("reconnectConfirmed", JSON.stringify([socket.id]));
        io.to(roomId).emit("playerJoined", { playerId: socket.id, roomSize: rooms[roomId].players.length });
        io.emit("updateRooms", rooms);  // 通知所有人更新房間清單
        console.log(`玩家 ${socket.id} 加入房間 ${roomId}`);

        if (rooms[roomId].players.length == 4) {
///rooms[roomId].ynstar=1
            befgame(roomId)
            return;
        }
    });

    // 玩家離開或斷線
socket.on("disconnect", (reason) => {
    // 找出這名玩家所在的所有房間（有可能同時在多個）
    for (const roomId in rooms) {
        if (rooms[roomId].players.includes(socket.id)) {
            // 通知房內其他玩家某人離線

rooms[roomId].playerpic = rooms[roomId].playerpic.filter(p => p.playerId !== socket.id);

io.to(roomId).emit("allche", JSON.stringify(rooms[roomId].playerpic));

            io.to(roomId).emit("playerDisconnected", { playerId: socket.id });

            // 是房主或房間沒人 => 移除整個房間
            if (
                rooms[roomId].host === socket.id ||
                io.sockets.adapter.rooms.get(roomId)?.size === 0
            ) {
                ///delete rooms[roomId];
rooms[roomId].ynstar=0
            } else {
                // 否則只移除這名玩家
                rooms[roomId].players = rooms[roomId].players.filter(
                    (playerId) => playerId !== socket.id
                );
            }
        }
    }

    io.emit("updateRooms", rooms); // 更新房間清單
    console.log(`玩家已斷線: ${socket.id}, 原因: ${reason}`);
});

    // 獲取房間清單
    socket.on("getRooms", () => {
        socket.emit("updateRooms", rooms);
    });

socket.on("invit", (data) => {

  const friendPin = data[0];
  const roomId = data[1];

console.log(roomId)

io.to(friendPin).emit("roomCreated", { roomId: data[1] });

});

    socket.on("myche", (che) => {

roomId=JSON.parse(che)[0]

rooms[roomId].playerpic.push({"che":JSON.parse(che)[1],"playerId":socket.id});

io.to(roomId).emit("allche", JSON.stringify(rooms[roomId].playerpic));

    });

    socket.on("delroom", (roominf) => {///刪除房間

roomId=JSON.parse(roominf)[0]

console.log("刪除房間"+roomId)

delete rooms[roomId];


    });

function cleanEmptyRooms() {
  const roomKeys = Object.keys(rooms);
  if (roomKeys.length > 10) {
    for (const key of roomKeys) {
      if (rooms[key].players.length === 0) {
        delete rooms[key];
        console.log(`刪除空房間: ${key}`);
      }
    }
  }
}

function befgame(roominf){

roomId=roominf

rooms[roomId].allmgd=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
rooms[roomId].alps=0
rooms[roomId].epgh=[]
rooms[roomId].pled=0
rooms[roomId].epghpk=[]
rooms[roomId].players2=[]
rooms[roomId].makrs=0///莊家
rooms[roomId].linmrs=0///連莊次數
rooms[roomId].chnwind=28///圈位
rooms[roomId].junwind=28///將位
rooms[roomId].win=0///胡牌



    for (let i = 4 - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // 產生 0 到 i 之間的隨機索引
        [rooms[roomId].players[i], rooms[roomId].players[j]] = [rooms[roomId].players[j], rooms[roomId].players[i]]; // 交換位置
    }

}

function newgame(roominf){

roomId=roominf

rooms[roomId].allmgd=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
rooms[roomId].epgh=[]
rooms[roomId].pled=0
rooms[roomId].alps=0
rooms[roomId].epghpk=[]
rooms[roomId].players2=[]
rooms[roomId].makrs=Math.floor(Math.random() * 4)///莊家
rooms[roomId].linmrs=0///連莊次數
rooms[roomId].chnwind=28///圈位
rooms[roomId].junwind=28///將位
rooms[roomId].win=0///胡牌

}


socket.on("gamStar", (mtd) => {

rooms[roomId].alps++

console.log("玩家準備就緒:"+rooms[roomId].alps)

if(rooms[roomId].alps==rooms[roomId].players.length){

sratgame(roomId)

}

})

socket.on("dice", (mtd) => {

rooms[roomId].alps++

if(rooms[roomId].alps<rooms[roomId].players.length){

return

}

rooms[roomId].alps=0

rooms[roomId].dice1=Math.floor(Math.random() * 6+1);
rooms[roomId].dice2=Math.floor(Math.random() * 6+1);
rooms[roomId].dice3=Math.floor(Math.random() * 6+1);

io.to(roomId).emit("dice", JSON.stringify([rooms[roomId].dice1,rooms[roomId].dice2,rooms[roomId].dice3]));

})

socket.on("myname", (mtd) => {

console.log("莊家:"+rooms[roomId].players[rooms[roomId].makrs])

io.to(socket.id).emit("myname", JSON.stringify([socket.id,rooms[roomId].players,rooms[roomId].players[rooms[roomId].makrs]]));

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

console.log(rooms[roomId].epgh)

})

socket.on("pon", (canephinf) => {

roomId=JSON.parse(canephinf)[0]
card=JSON.parse(canephinf)[1]

console.log("碰"+card)

rooms[roomId].epgh.push({"num":2,"ple":socket.id,"mtd":card,"dwo":"pon"})

console.log(rooms[roomId].epgh)

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
lbmgd=JSON.parse(canephinf)[2]
flmgd=JSON.parse(canephinf)[3]
etmgd=JSON.parse(canephinf)[4]

mra=3

rooms[roomId].players2=rooms[roomId].players.concat(rooms[roomId].players)

mra+=rooms[roomId].players2.indexOf(socket.id,rooms[roomId].pled)

rooms[roomId].epgh.push({"num":mra,"ple":socket.id,"mtd":card,"dwo":"win","lbmgd":lbmgd,"flmgd":flmgd,"etmgd":etmgd})

})

function sratgame(roominf){

rooms[roomId].allmgd=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
rooms[roomId].epgh=[]
rooms[roomId].pled=0
rooms[roomId].alps=0
rooms[roomId].epghpk=[]
rooms[roomId].players2=[]
rooms[roomId].win=0///胡牌

rooms[roomId].alps=0

roomId=roominf

for(let s=0;s<rooms[roomId].players.length;s++){

plmgdnew=[]

for(let i=0;i<16;i++){

var n = Math.floor(Math.random() * 144)+1;///

n=(n<137)?Math.ceil(n/4):n-136+34

while(n<=34&&rooms[roomId].allmgd[n]>3||n>34&&rooms[roomId].allmgd[n]>0){///抽出一開始的16張牌(不能重覆)

var n = Math.floor(Math.random() * 144)+1;///

n=(n<137)?Math.ceil(n/4):n-136+34

}
rooms[roomId].allmgd[n]++

plmgdnew.push(n)

}

console.log("發送給玩家:"+rooms[roomId].players[s]+"手牌:"+plmgdnew)

io.to(rooms[roomId].players[s]).emit("star", JSON.stringify(plmgdnew));

}

rooms[roomId].alps=0

rooms[roomId].pled=rooms[roomId].makrs




}


////////


socket.on("flower", (roomIdinf) => {

roomId=JSON.parse(roomIdinf)[0]
card=JSON.parse(roomIdinf)[1]

io.to(roomId).emit("flower", JSON.stringify([socket.id ,card]));

console.log("玩家:"+socket.id+"補花"+card)

})

///////////////////////////////////////////////////////

socket.on("getnewcard", (roomIdinf) => {

roomId=JSON.parse(roomIdinf)[0]

var n = Math.floor(Math.random() * 144)+1;///

n=(n<137)?Math.ceil(n/4):n-136+34

while(n<=34&&rooms[roomId].allmgd[n]>3||n>34&&rooms[roomId].allmgd[n]>0){///抽出一開始的16張牌(不能重覆)

var n = Math.floor(Math.random() * 144)+1;///

n=(n<137)?Math.ceil(n/4):n-136+34

}

rooms[roomId].allmgd[n]++

console.log("發送給玩家:"+socket.id+"牌:"+n)

io.to(roomId).emit("getnewcard2", JSON.stringify(socket.id));

io.to(socket.id).emit("getnewcard", JSON.stringify(n));

rooms[roomId].pled=rooms[roomId].players.indexOf(socket.id)

});

///////////////////////////////////////////////////////

socket.on("needgetcardgun", (roomIdinf) => {

roomId=JSON.parse(roomIdinf)[0]
neepl=JSON.parse(roomIdinf)[1]

rooms[roomId].alps++

console.log(rooms[roomId].alps)

if(rooms[roomId].alps==rooms[roomId].players.length){

var n = Math.floor(Math.random() * 144)+1;///

n=(n<137)?Math.ceil(n/4):n-136+34

while(n<=34&&rooms[roomId].allmgd[n]>3||n>34&&rooms[roomId].allmgd[n]>0){///抽出一開始的16張牌(不能重覆)

var n = Math.floor(Math.random() * 144)+1;///

n=(n<137)?Math.ceil(n/4):n-136+34

}

rooms[roomId].allmgd[n]++

console.log("發送給玩家:"+neepl+"牌:"+n)

io.to(roomId).emit("getnewcard2", JSON.stringify(neepl));

io.to(neepl).emit("getnewcard", JSON.stringify(n));

rooms[roomId].pled=rooms[roomId].players.indexOf(neepl)

}

});

///////////////////////////////////////////////////////

socket.on("gunget", (roomIdinf) => {

roomId=JSON.parse(roomIdinf)[0]

var n = Math.floor(Math.random() * 144)+1;///

n=(n<137)?Math.ceil(n/4):n-136+34

while(n<=34&&rooms[roomId].allmgd[n]>3||n>34&&rooms[roomId].allmgd[n]>0){///抽出一開始的16張牌(不能重覆)

var n = Math.floor(Math.random() * 144)+1;///

n=(n<137)?Math.ceil(n/4):n-136+34

}

rooms[roomId].allmgd[n]++

console.log("發送給玩家:"+socket.id+"牌:"+n)

io.to(roomId).emit("getnewcard2", JSON.stringify(socket.id));

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

rooms[roomId].pled=rooms[roomId].players.indexOf(socket.id)

rooms[roomId].alps=0

});

///////////////////////////////////////////////////////

socket.on("befbegin", (roomIdinf) => {

rooms[roomId].alps++

if(rooms[roomId].alps==4){

console.log("補花完畢")

io.to(roomId).emit("befbegin", []);

rooms[roomId].alps=0

}

});

///////////////////////////////////////////////////////

socket.on("begin", (roomIdinf) => {

roomId=JSON.parse(roomIdinf)[0]

rooms[roomId].alps++

console.log(rooms[roomId].alps)

if(rooms[roomId].alps==4){

var n = Math.floor(Math.random() * 144)+1;///

n=(n<137)?Math.ceil(n/4):n-136+34

while(n<=34&&rooms[roomId].allmgd[n]>3||n>34&&rooms[roomId].allmgd[n]>0){///抽出一開始的16張牌(不能重覆)

var n = Math.floor(Math.random() * 144)+1;///

n=(n<137)?Math.ceil(n/4):n-136+34

}

rooms[roomId].allmgd[n]++

console.log("發送給玩家:"+rooms[roomId].players[rooms[roomId].makrs]+"牌:"+n)

///io.to(roomId).emit("begin", []);

io.to(roomId).emit("getnewcard2", JSON.stringify(rooms[roomId].players[rooms[roomId].makrs]));

io.to(rooms[roomId].players[rooms[roomId].makrs]).emit("getnewcard", JSON.stringify(n));

rooms[roomId].pled=rooms[roomId].makrs

console.log("開始打牌")

}

})


socket.on("needgetcard", (roomIdinf) => {

roomId=JSON.parse(roomIdinf)[0]
ple=JSON.parse(roomIdinf)[1]

if(rooms[roomId].win==1){

return

}

rooms[roomId].alps++

btop=0

console.log(rooms[roomId].epghpk,rooms[roomId].alps,rooms[roomId].epgh)

if(rooms[roomId].epghpk.length!=0){

if(rooms[roomId].epgh.length!=0){

rooms[roomId].epgh.sort(function (a, b) {///

return b.num - a.num

});

}

btop=Math.max(...Object.values(rooms[roomId].epghpk))

if(rooms[roomId].alps==rooms[roomId].players.length&&rooms[roomId].epgh.length!=0||rooms[roomId].epgh.length!=0&&rooms[roomId].epgh[0].num>=btop&&rooms[roomId].epgh.length!=0){

rooms[roomId].epgh.sort(function (a, b) {///

return b.num - a.num

});

if(rooms[roomId].epgh[0].dwo!="win"){

io.to(roomId).emit("caneph", JSON.stringify([rooms[roomId].epgh[0].ple,rooms[roomId].epgh[0].mtd,rooms[roomId].epgh[0].dwo]));

rooms[roomId].pled=rooms[roomId].players.indexOf(rooms[roomId].epgh[0].ple)

}

if(rooms[roomId].epgh[0].dwo=="win"){

io.to(roomId).emit("caneph", JSON.stringify([rooms[roomId].epgh[0].ple,rooms[roomId].epgh[0].mtd,rooms[roomId].epgh[0].dwo,rooms[roomId].epgh[0].lbmgd,rooms[roomId].epgh[0].flmgd,rooms[roomId].epgh[0].etmgd]));

console.log("胡牌:"+rooms[roomId].players2.indexOf(rooms[roomId].epgh[0].ple))

console.log("莊家:"+rooms[roomId].makrs)

if(rooms[roomId].players2.indexOf(rooms[roomId].epgh[0].ple)!=rooms[roomId].makrs){

rooms[roomId].makrs=(rooms[roomId].makrs+1<4)?rooms[roomId].makrs+1:0

}

rooms[roomId].win=1

console.log("新莊家:"+rooms[roomId].makrs)

}

rooms[roomId].epgh=[]

rooms[roomId].epghpk=[]

rooms[roomId].alps=0

return

}

}

if(rooms[roomId].alps==rooms[roomId].players.length&&rooms[roomId].epgh.length==0){

console.log(rooms[roomId].epghpk,rooms[roomId].alps,rooms[roomId].epgh)

let nexpled=(rooms[roomId].pled+1<rooms[roomId].players.length)?rooms[roomId].players[rooms[roomId].pled+1]:rooms[roomId].players[0]

io.to(nexpled).emit("needgetcard", (""));

rooms[roomId].alps=0

}

});


});


const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
    console.log(`伺服器運行中： http://localhost:${PORT}`);
});