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

const { spawn } = require('child_process');

function runClient(name ,jorooms='') {
  const scripts = ['max.js', 'maxatk.js', 'maxsafe.js'];

  // 隨機選一個 JS 檔案
  const script = scripts[Math.floor(Math.random() * scripts.length)];

  const child = spawn('node', [script, name], {

    ///stdio: 'inherit',

  });

 console.log(`${name || script} 已連線`);

  child.on('close', (code) => {
    console.log(`${name || script} 結束，退出碼: ${code}`);
  });
}

function opeAI(){

console.log(allAIID)

if(Object.keys(allAIID).length>=10){ return}

setTimeout(() => {

runClient('')

opeAI()

},3500)

}


allAIID={}///空閒的AI

setTimeout(() => {

///runClient('')

},10000)


const rooms = {};
///rooms["025024"] = { host: "貓貓", players: [] ,playerid: [] ,playerpic: [] ,ynstar:0,ynfriend:0,alps:0,epgh:[],pled:0,allmgd:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]};

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
        console.log(Object.keys(allAIID).length,"AI數量");
if(Object.keys(allAIID).length<10){

console.log("創建AI");

runClient('')

}
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
        rooms[roomId] = { host: socket.id, players: [] ,playerid: [] ,playerpic: [], allmgd2:0 ,ynstar:0,ynfriend:0,alps:0,epgh:[],pled:0,allmgd:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]};
        socket.join(roomId);
        io.emit("updateRooms", rooms);  // 通知所有人更新房間清單
        socket.emit("roomCreated", { roomId });
        console.log(`房間 ${roomId} 創建成功`);
        console.log(Object.keys(allAIID).length,"AI數量");
if(Object.keys(allAIID).length<10){

console.log("創建AI");

runClient('')

}
}

    });
    socket.on("createRoom2", () => {
        const roomId = socket.id;  // 直接用 socket.id 當作房間 ID
        rooms[roomId] = { host: socket.id, players: [] ,playerid: [] ,playerpic: [], allmgd2:0,ynstar:0,ynfriend:1,alps:0,epgh:[],pled:0,allmgd:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]};
        socket.join(roomId);
        cleanEmptyRooms()
        io.emit("updateRooms", rooms);  // 通知所有人更新房間清單
        socket.emit("roomCreated", { roomId });
        console.log(`房間 ${roomId} 創建成功`);
        console.log(Object.keys(allAIID).length,"AI數量");
if(Object.keys(allAIID).length<10){

console.log("創建AI");

runClient('')

}
    });
    // 玩家加入房間
    socket.on("joinRoom", (roomId) => {
        if (!rooms[roomId] || rooms[roomId].players.length >= 4||rooms[roomId].ynstar==1) {
            socket.emit("roomFull");
            return;
        }
if (allAIID[socket.id]){

delete allAIID[socket.id];

if(Object.keys(allAIID).length<10){

runClient('')

}

console.log(allAIID)

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

if (allAIID[socket.id]){

delete allAIID[socket.id];

if(Object.keys(allAIID).length<10){

runClient('')

}

console.log(allAIID)

}

    console.log(`玩家已斷線: ${socket.id}, 原因: ${reason}`);
});

    // 獲取房間清單
    socket.on("getRooms", () => {
        socket.emit("updateRooms", rooms);
    });

socket.on("wantinvit", (roomId) => {

console.log("收到房間邀請AI",roomId)

        if (!rooms[roomId] || rooms[roomId].players.length >= 4) {///||rooms[roomId].players.length<=1

            return;

        }

///runClient('')

///io.emit("wantinvit", roomId);

///return

if(Object.keys(allAIID).length>0){

io.to(Object.keys(allAIID)[0]).emit("wantinvit", roomId);

delete allAIID[Object.keys(allAIID)[0]];

}

///opeAI()


});


socket.on("ingameAI", (neme) => {

if (allAIID[socket.id] === undefined) {

  allAIID[socket.id] = neme;

}
console.log("AI上線",neme,socket.id)

console.log(allAIID)

if(Object.keys(allAIID).length>=10){ return}

runClient('')

///opeAI()

})

socket.on("invit", (data) => {

  const friendPin = data[0];
  const roomId = data[1];

console.log(roomId)

io.to(friendPin).emit("roomCreated", { roomId: data[1] });

});

    socket.on("myche", (che) => {

const  roomId=JSON.parse(che)[0]

rooms[roomId].playerpic.push({"che":JSON.parse(che)[1],"playerId":socket.id});

io.to(roomId).emit("allche", JSON.stringify(rooms[roomId].playerpic));

    });

    socket.on("delroom", (roominf) => {///刪除房間

const  roomId=JSON.parse(roominf)[0]

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

const  roomId=roominf

rooms[roomId].allmgd=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
rooms[roomId].outmgd=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
rooms[roomId].alps=0
rooms[roomId].alps4=[rooms[roomId].players.length,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
rooms[roomId].epgh=[]
rooms[roomId].pled=0
rooms[roomId].resn=0
rooms[roomId].epghpk={}
rooms[roomId].players2=[]
rooms[roomId].makrs=0///莊家
rooms[roomId].linmrs=0///連莊次數
rooms[roomId].chnwind=28///圈位
rooms[roomId].junwind=28///將位
rooms[roomId].win=0///胡牌
rooms[roomId].allmgd2=0
rooms[roomId].stat=0
rooms[roomId].card=[]


    for (let i = 4 - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // 產生 0 到 i 之間的隨機索引
        [rooms[roomId].players[i], rooms[roomId].players[j]] = [rooms[roomId].players[j], rooms[roomId].players[i]]; // 交換位置
    }

}

socket.on("gamStar", (roomsinf) => {

const roomId=roomsinf

rooms[roomId].alps++

console.log("玩家準備就緒:"+rooms[roomId].alps)

if(rooms[roomId].alps==rooms[roomId].players.length){

rooms[roomId].alps=0

sratgame(roomId)

}

})

socket.on("dice", (roomsinf) => {

const roomId=roomsinf

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

socket.on("myname", (roomsinf) => {

const roomId=roomsinf

console.log("莊家:"+rooms[roomId].players[rooms[roomId].makrs])

io.to(socket.id).emit("myname", JSON.stringify([socket.id,rooms[roomId].players,rooms[roomId].players[rooms[roomId].makrs]]));

})

socket.on("epghpk", (epghpkinf) => {

const roomId=JSON.parse(epghpkinf)[0]
let mrs=JSON.parse(epghpkinf)[1]///返回的層級

if(mrs==3){

rooms[roomId].players2=rooms[roomId].players.concat(rooms[roomId].players).reverse()

mrs+=rooms[roomId].players2.indexOf(socket.id,rooms[roomId].pled)

rooms[roomId].players2.reverse()

}

if (!rooms[roomId].epghpk[socket.id]) rooms[roomId].epghpk[socket.id] = [];
rooms[roomId].epghpk[socket.id].push(mrs);

})

socket.on("noepgh", (canephinf) => {

const roomId=JSON.parse(canephinf)[0]
const card=JSON.parse(canephinf)[1]

console.log("取消"+card)

delete rooms[roomId].epghpk[socket.id]

rooms[roomId].alps4[card]++

rooms[roomId].alps++

needcaneph(roomId,socket.id,[card,card,card])

})

socket.on("eat", (canephinf) => {

const roomId=JSON.parse(canephinf)[0]
const card=JSON.parse(canephinf)[1]

console.log("吃"+card)

rooms[roomId].epgh.push({"num":1,"ple":socket.id,"mtd":card,"dwo":"eat"})

console.log(rooms[roomId].epgh)

rooms[roomId].alps4[card[1]]++

needcaneph(roomId,socket.id,card)

})

socket.on("pon", (canephinf) => {

const roomId=JSON.parse(canephinf)[0]
const card=JSON.parse(canephinf)[1]

console.log("碰"+card)

rooms[roomId].epgh.push({"num":2,"ple":socket.id,"mtd":card,"dwo":"pon"})

console.log(rooms[roomId].epgh)

rooms[roomId].alps4[card[1]]++

needcaneph(roomId,socket.id,card)

})

socket.on("gun", (canephinf) => {

const roomId=JSON.parse(canephinf)[0]
const card=JSON.parse(canephinf)[1]

console.log("槓"+card)

rooms[roomId].epgh.push({"num":2,"ple":socket.id,"mtd":card,"dwo":"gun"})

rooms[roomId].resn=0

rooms[roomId].alps4[card[1]]++

needcaneph(roomId,socket.id,card)

})

socket.on("tin", (canephinf) => {

const roomId=JSON.parse(canephinf)[0]
const card=JSON.parse(canephinf)[1]

io.to(roomId).emit("caneph", JSON.stringify([socket.id,card,"tin"]));

})

socket.on("win", (canephinf) => {

const roomId=JSON.parse(canephinf)[0]
const card=JSON.parse(canephinf)[1]
const lbmgd=JSON.parse(canephinf)[2]
const flmgd=JSON.parse(canephinf)[3]
const etmgd=JSON.parse(canephinf)[4]

let mra=3

rooms[roomId].players2=rooms[roomId].players.concat(rooms[roomId].players).reverse()

mra+=rooms[roomId].players2.indexOf(socket.id,rooms[roomId].pled)

rooms[roomId].players2.reverse()

rooms[roomId].epgh.push({"num":mra,"ple":socket.id,"mtd":card,"dwo":"win","lbmgd":lbmgd,"flmgd":flmgd,"etmgd":etmgd})

rooms[roomId].alps4[card[card.length-1]]++

needcaneph(roomId,socket.id,card)

})

socket.on("mywin", (canephinf) => {

const roomId=JSON.parse(canephinf)[0]
const card=JSON.parse(canephinf)[1]
const lbmgd=JSON.parse(canephinf)[2]
const flmgd=JSON.parse(canephinf)[3]
const etmgd=JSON.parse(canephinf)[4]

let mra=3

rooms[roomId].players2=rooms[roomId].players.concat(rooms[roomId].players).reverse()

mra+=rooms[roomId].players2.indexOf(socket.id,rooms[roomId].pled)

rooms[roomId].players2.reverse()

rooms[roomId].epgh.push({"num":mra,"ple":socket.id,"mtd":card,"dwo":"mywin","lbmgd":lbmgd,"flmgd":flmgd,"etmgd":etmgd})

rooms[roomId].alps4[card[card.length-1]]++

needcaneph(roomId,socket.id,card)

})

function sratgame(roominf){

const roomId=roominf

rooms[roomId].allmgd=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
rooms[roomId].outmgd=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
rooms[roomId].epgh=[]
rooms[roomId].pled=0
rooms[roomId].resn=0
rooms[roomId].alps=0
rooms[roomId].alps4=[rooms[roomId].players.length,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
rooms[roomId].epghpk={}
rooms[roomId].players2=[]
rooms[roomId].win=0///胡牌
rooms[roomId].stat=0
rooms[roomId].card=[]

for(let s=0;s<rooms[roomId].players.length;s++){

plmgdnew=[]

for(let i=0;i<16;i++){

  let n = 0;
  do {
    n = Math.floor(Math.random() * 144) + 1;
    n = (n < 137) ? Math.ceil(n / 4) : n - 136 + 34;
  } while ((n <= 34 && rooms[roomId].allmgd[n] > 3) || (n > 34 && rooms[roomId].allmgd[n] > 0));

rooms[roomId].allmgd[n]++

rooms[roomId].allmgd2++

plmgdnew.push(n)

}

console.log("發送給玩家:"+rooms[roomId].players[s]+"手牌:"+plmgdnew)

io.to(rooms[roomId].players[s]).emit("star", JSON.stringify(plmgdnew));

}

rooms[roomId].alps=0

rooms[roomId].pled=rooms[roomId].makrs

rooms[roomId].allmgd2=64


}


////////


socket.on("flower", (roomIdinf) => {

const roomId=JSON.parse(roomIdinf)[0]
const card=JSON.parse(roomIdinf)[1]

io.to(roomId).emit("flower", JSON.stringify([socket.id ,card]));

console.log("玩家:"+socket.id+"補花"+card)

})

///////////////////////////////////////////////////////

socket.on("getnewcard", (roomIdinf) => {

const roomId=JSON.parse(roomIdinf)[0]

if(rooms[roomId].allmgd2==128){

io.to(roomId).emit("nowin", []);

console.log("留局")

}

if(rooms[roomId].allmgd2<128){

  let n = 0;
  do {
    n = Math.floor(Math.random() * 144) + 1;
    n = (n < 137) ? Math.ceil(n / 4) : n - 136 + 34;
  } while ((n <= 34 && rooms[roomId].allmgd[n] > 3) || (n > 34 && rooms[roomId].allmgd[n] > 0));

rooms[roomId].allmgd[n]++

rooms[roomId].allmgd2++

rooms[roomId].resn=0

console.log("剩下張數:"+(128-rooms[roomId].allmgd2))

console.log("發送給玩家:"+socket.id+"牌:"+n)

io.to(roomId).emit("getnewcard2", JSON.stringify(socket.id));

io.to(socket.id).emit("getnewcard", JSON.stringify(n));

rooms[roomId].pled=rooms[roomId].players.indexOf(socket.id)

}

});

///////////////////////////////////////////////////////

socket.on("needgetcardgun", (roomIdinf) => {

const roomId=JSON.parse(roomIdinf)[0]
const neepl=JSON.parse(roomIdinf)[1]

if(rooms[roomId].allmgd2==128){

io.to(roomId).emit("nowin", []);

console.log("留局")

}

if(rooms[roomId].allmgd2<128){

rooms[roomId].alps++

console.log(rooms[roomId].alps,"needgetcardgun")

if(rooms[roomId].alps==rooms[roomId].players.length){

  let n = 0;
  do {
    n = Math.floor(Math.random() * 144) + 1;
    n = (n < 137) ? Math.ceil(n / 4) : n - 136 + 34;
  } while ((n <= 34 && rooms[roomId].allmgd[n] > 3) || (n > 34 && rooms[roomId].allmgd[n] > 0));


rooms[roomId].allmgd[n]++

rooms[roomId].allmgd2++

rooms[roomId].resn=0

console.log("剩下張數:"+(128-rooms[roomId].allmgd2))

console.log("發送給玩家:"+neepl+"牌:"+n)

rooms[roomId].pled=rooms[roomId].players.indexOf(neepl)

io.to(roomId).emit("getnewcard2", JSON.stringify(neepl));

io.to(neepl).emit("getnewcard", JSON.stringify(n));

}

}

});

///////////////////////////////////////////////////////

socket.on("gunget", (roomIdinf) => {

const  roomId=JSON.parse(roomIdinf)[0]

if(rooms[roomId].allmgd2==128){

io.to(roomId).emit("nowin", []);

console.log("留局")

}

if(rooms[roomId].allmgd2<128){

  let n = 0;
  do {
    n = Math.floor(Math.random() * 144) + 1;
    n = (n < 137) ? Math.ceil(n / 4) : n - 136 + 34;
  } while ((n <= 34 && rooms[roomId].allmgd[n] > 3) || (n > 34 && rooms[roomId].allmgd[n] > 0));


rooms[roomId].allmgd[n]++

rooms[roomId].allmgd2++

rooms[roomId].resn=0

console.log("剩下張數:"+(128-rooms[roomId].allmgd2))

console.log("發送給玩家:"+socket.id+"牌:"+n)

io.to(roomId).emit("getnewcard2", JSON.stringify(socket.id));

io.to(socket.id).emit("getnewcard", JSON.stringify(n));

rooms[roomId].pled=rooms[roomId].players.indexOf(socket.id)

}

});

///////////////////////////////////////////////////////
socket.on("outcard", (roomIdinf) => {

const  roomId=JSON.parse(roomIdinf)[0]
const card=JSON.parse(roomIdinf)[1]

rooms[roomId].card=[socket.id ,card]
rooms[roomId].epgh=[]
rooms[roomId].epghpk={}

console.log("outcard",rooms[roomId].alps4,socket.id,rooms[roomId].card)

if(rooms[roomId].alps4[rooms[roomId].resn]==rooms[roomId].players.length){

console.log("玩家:"+rooms[roomId].card[0]+"打出牌:"+rooms[roomId].card[1],rooms[roomId].alps)

rooms[roomId].pled=rooms[roomId].players.indexOf(rooms[roomId].card[0])

rooms[roomId].alps=0

rooms[roomId].alps4=[rooms[roomId].players.length,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

rooms[roomId].epgh=[]

rooms[roomId].epghpk={}

io.to(roomId).emit("outcard", JSON.stringify(rooms[roomId].card));

rooms[roomId].card=[]

}

});
///////////////////////////////////////////////////////

socket.on("outchak", (roomIdinf) => {

const  roomId=JSON.parse(roomIdinf)[0]
const card=JSON.parse(roomIdinf)[1]


rooms[roomId].outmgd[card]++


console.log("outchak",socket.id,rooms[roomId].outmgd[card],card)

if(rooms[roomId].win==1){

rooms[roomId].alps=0

}

if(rooms[roomId].outmgd[card]==rooms[roomId].players.length){

console.log("確認各家吃碰槓胡",card,rooms[roomId].outmgd[card])

rooms[roomId].outmgd=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

rooms[roomId].alps=0

rooms[roomId].alps4=[rooms[roomId].players.length,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

io.to(roomId).emit("outchak", JSON.stringify([socket.id ,card]));

}

});

///////////////////////////////////////////////////////

socket.on("befbegin", (roomIdinf) => {

const  roomId=JSON.parse(roomIdinf)[0]

rooms[roomId].alps++

if(rooms[roomId].alps==4){

console.log("補花完畢")

rooms[roomId].alps=0

rooms[roomId].stat=1

io.to(roomId).emit("befbegin", []);

}

});

///////////////////////////////////////////////////////

socket.on("begin", (roomIdinf) => {

const  roomId=JSON.parse(roomIdinf)[0]

rooms[roomId].alps++

console.log(rooms[roomId].alps,"begin")

if(rooms[roomId].alps==4){

  let n = 0;
  do {
    n = Math.floor(Math.random() * 144) + 1;
    n = (n < 137) ? Math.ceil(n / 4) : n - 136 + 34;
  } while ((n <= 34 && rooms[roomId].allmgd[n] > 3) || (n > 34 && rooms[roomId].allmgd[n] > 0));


rooms[roomId].allmgd[n]++

rooms[roomId].allmgd2++

console.log("發送給玩家:"+rooms[roomId].players[rooms[roomId].makrs]+"牌:"+n)

///io.to(roomId).emit("begin", []);

rooms[roomId].pled=rooms[roomId].makrs

///rooms[roomId].alps=0

console.log("開始打牌")

io.to(roomId).emit("getnewcard2", JSON.stringify(rooms[roomId].players[rooms[roomId].makrs]));

io.to(rooms[roomId].players[rooms[roomId].makrs]).emit("getnewcard", JSON.stringify(n));

rooms[roomId].resn=0

}

})





function needcaneph(roomId,player,card){

if(rooms[roomId].win==1){

rooms[roomId].alps=0

}
if(rooms[roomId].win==1){

return

}


if(Object.keys(rooms[roomId].epghpk).length!=0){

console.log("needcaneph",rooms[roomId].epghpk,rooms[roomId].epgh,player)

if(rooms[roomId].epgh.length!=0){

let maxVal = -Infinity;
let maxKey = null;

for (let key in rooms[roomId].epghpk) {
  let arr = rooms[roomId].epghpk[key];
  let localMax = Math.max(...arr); // 找出這個 key 的陣列最大值
  if (localMax > maxVal) {
    maxVal = localMax;
    maxKey = key;
  }
}

console.log("最大值:", maxVal);   // 2
console.log("對應的 key:", maxKey); // "A02"



const btop=maxVal///最大值
const btoper=maxKey///優先權的人


for(let i=0;i<rooms[roomId].epgh.length;i++){

if(rooms[roomId].epgh[i].ple==btoper){



if(rooms[roomId].epgh[i].dwo=="gun"&&rooms[roomId].epgh[i].mtd[1]=="X"){

io.to(roomId).emit("caneph", JSON.stringify([rooms[roomId].epgh[i].ple,rooms[roomId].epgh[i].mtd,rooms[roomId].epgh[i].dwo]));

rooms[roomId].pled=rooms[roomId].players.indexOf(rooms[roomId].epgh[i].ple)

rooms[roomId].alps=0

rooms[roomId].epgh=[]

rooms[roomId].epghpk={}

rooms[roomId].card=[]

rooms[roomId].alps4=[rooms[roomId].players.length,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

return

}///if(rooms[roomId].epgh[i].dwo=="gun"&&rooms[roomId].epgh[i].mtd[1]=="X"){



if(rooms[roomId].epgh[i].dwo!="win"&&rooms[roomId].epgh[i].dwo!="mywin"){

rooms[roomId].pled=rooms[roomId].players.indexOf(rooms[roomId].epgh[i].ple)

console.log(rooms[roomId].epgh[i].dwo,rooms[roomId].alps)

io.to(roomId).emit("caneph", JSON.stringify([rooms[roomId].epgh[i].ple,rooms[roomId].epgh[i].mtd,rooms[roomId].epgh[i].dwo]));

}///if(rooms[roomId].epgh[i].dwo!="win"&&rooms[roomId].epgh[i].dwo!="mywin"){




if(rooms[roomId].epgh[i].dwo=="win"||rooms[roomId].epgh[i].dwo=="mywin"){

io.to(roomId).emit("caneph", JSON.stringify([rooms[roomId].epgh[i].ple,rooms[roomId].epgh[i].mtd,"win",rooms[roomId].epgh[i].lbmgd,rooms[roomId].epgh[i].flmgd,rooms[roomId].epgh[i].etmgd]));

console.log("胡牌:"+rooms[roomId].players2.indexOf(rooms[roomId].epgh[i].ple))

console.log("莊家:"+rooms[roomId].makrs)

if(rooms[roomId].players2.indexOf(rooms[roomId].epgh[i].ple)!=rooms[roomId].makrs){

rooms[roomId].makrs=(rooms[roomId].makrs+1<4)?rooms[roomId].makrs+1:0

}///if(rooms[roomId].players2.indexOf(rooms[roomId].epgh[i].ple)!=rooms[roomId].makrs){

rooms[roomId].win=1

rooms[roomId].card=[]

console.log("新莊家:"+rooms[roomId].makrs)

}///if(rooms[roomId].epgh[i].dwo=="win"||rooms[roomId].epgh[i].dwo=="mywin"){

rooms[roomId].epgh=[]

rooms[roomId].epghpk={}

rooms[roomId].card=[]

rooms[roomId].alps=0

return

}///if(rooms[roomId].epgh[i].ple==btoper){

}///for(let i=0;i<rooms[roomId].epgh.length;i++){

}///if(rooms[roomId].epgh.length!=0){

}///if(rooms[roomId].epghpk.length!=0){

if(rooms[roomId].alps==rooms[roomId].players.length){

setTimeout(() => {

io.to(nexpled).emit("needgetcard", (""));

},300)

console.log(rooms[roomId].epghpk,rooms[roomId].alps,rooms[roomId].epgh)

rooms[roomId].alps=0

rooms[roomId].alps4=[rooms[roomId].players.length,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

let nexpled=(rooms[roomId].pled+1<rooms[roomId].players.length)?rooms[roomId].players[rooms[roomId].pled+1]:rooms[roomId].players[0]

return

}

}


socket.on("needgetcard", (roomIdinf) => {

const  roomId=JSON.parse(roomIdinf)[0]
const ple=JSON.parse(roomIdinf)[1]
const resn=JSON.parse(roomIdinf)[2]

rooms[roomId].resn=resn

if(rooms[roomId].win==1){

rooms[roomId].alps=0

}
if(rooms[roomId].win==1){

return

}


rooms[roomId].alps4[rooms[roomId].resn]++

console.log("needgetcard",socket.id,resn,rooms[roomId].alps4[rooms[roomId].resn],rooms[roomId].card)




rooms[roomId].alps++

if(rooms[roomId].alps==rooms[roomId].players.length){

setTimeout(() => {

io.to(nexpled).emit("needgetcard", (""));

},300)

console.log(rooms[roomId].epghpk,rooms[roomId].alps,rooms[roomId].epgh)

rooms[roomId].alps=0

rooms[roomId].alps4=[rooms[roomId].players.length,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

let nexpled=(rooms[roomId].pled+1<rooms[roomId].players.length)?rooms[roomId].players[rooms[roomId].pled+1]:rooms[roomId].players[0]

return

}


if(rooms[roomId].alps4[rooms[roomId].resn]==rooms[roomId].players.length&&rooms[roomId].card.length!=0){

console.log("玩家:"+rooms[roomId].card[0]+"打出牌:"+rooms[roomId].card[1],rooms[roomId].alps)

rooms[roomId].pled=rooms[roomId].players.indexOf(rooms[roomId].card[0])

rooms[roomId].alps=0

rooms[roomId].alps4=[rooms[roomId].players.length,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

io.to(roomId).emit("outcard", JSON.stringify(rooms[roomId].card));

rooms[roomId].card=[]

return

}


});


});


const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
    console.log(`伺服器運行中： http://localhost:${PORT}`);
});

