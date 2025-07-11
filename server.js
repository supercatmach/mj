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
const imageFolder = path.join(__dirname, "public/watse");
app.use(express.static("public"));

app.get("/imglist", (req, res) => {
  const fs = require("fs");
  const path = require("path");

  const dirPath = path.join(__dirname, "public", "watse");

  fs.readdir(dirPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "讀取圖片清單失敗" });
    }

    const imgUrls = files
      .filter(file => /\.(jpg|png|jpeg|gif|webp)$/i.test(file))
      .map(file => `watse/${file}`); // ✅ 修正這行

    res.json(imgUrls);
  });
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
      styleSrc: [
        "'self'",
        "'unsafe-inline'",
        "https://cdnjs.cloudflare.com"   // <-- 新增允許 FontAwesome CSS 來源
      ],
      imgSrc: ["'self'", "data:"],
      connectSrc: [
        "'self'",
        "https://mj-5x4w.onrender.com",
        "wss://mj-5x4w.onrender.com",
        "https://catchat-a7zb.onrender.com",
        "wss://catchat-a7zb.onrender.com",
        "https://mj-sp1.up.railway.app",
        "wss://mj-sp2.up.railway.app",
        "https://mj-sp1.up.railway.app",
        "wss://mj-sp2.up.railway.app"
      ],
      fontSrc: [
        "'self'",
        "https://fonts.googleapis.com",
        "https://fonts.gstatic.com",
        "https://cdnjs.cloudflare.com"  // <--- 建議也加上這裡，若FontAwesome用到字型
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

const { Worker } = require('worker_threads');
const EventEmitter = require('events');
const { randomUUID } = require("crypto")

const aiWorkers = {}
const workerToAiId = new Map(); // worker => aiId

const rooms = {};
///rooms["025024"] = { host: "貓貓", players: [] ,playerid: [] ,playerpic: [] ,ynstar:0,ynfriend:0,alps:0,epgh:[],pled:0,allmgd:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]};

io.on("connection", (socket) => {

    console.log("新玩家連線:", socket.id);

io.to(socket.id).emit("hi", socket.id);


   socket.on("waninRoom", () => {

const MAX_PLAYERS = 4;
const preferredCounts = [3, 2, 1, 0]; // 優先找人數3，再2，再1

let foundRoomKey = null;

for (const count of preferredCounts) {
  foundRoomKey = Object.entries(rooms).find(
    ([key, room]) =>
      room.players.length === count &&
      room.ynstar === 0 &&
      room.ynfriend === 0
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
        socket.emit("roomCreated", { roomId });
        console.log(`房間 ${roomId} 創建成功`);
        io.emit("updateRooms", rooms);  // 通知所有人更新房間清單

}

    });
    socket.on("createRoom2", () => {
        const roomId = socket.id;  // 直接用 socket.id 當作房間 ID
        rooms[roomId] = { host: socket.id, players: [] ,playerid: [] ,playerpic: [], allmgd2:0,ynstar:0,ynfriend:1,alps:0,epgh:[],pled:0,allmgd:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]};
        socket.join(roomId);
        cleanEmptyRooms()
        socket.emit("roomCreated", { roomId });
        console.log(`房間 ${roomId} 創建成功`);
        io.emit("updateRooms", rooms);  // 通知所有人更新房間清單

    });
    // 玩家加入房間
    socket.on("joinRoom", (roomId) => {
        if (!rooms[roomId] || rooms[roomId].players.length >= 4||rooms[roomId].ynstar==1) {
            socket.emit("roomFull");
            return;
        }

        rooms[roomId].players.push(socket.id);
        socket.join(roomId);
        io.emit("updateRooms", rooms);  // 通知所有人更新房間清單

        io.to(socket.id).emit("reconnectConfirmed", JSON.stringify([socket.id]));

        sendToClient(roomId, "playerJoined", { playerId: socket.id, roomSize: rooms[roomId].players.length });


        console.log(`玩家 ${socket.id} 加入房間 ${roomId}`);

        if (rooms[roomId].players.length == 4) {
            befgame(roomId)
        io.emit("updateRooms", rooms);  // 通知所有人更新房間清單
            return;
        }
    });

    // 玩家離開或斷線
socket.on("disconnect", (reason) => {
  for (const roomId in rooms) {
    if (rooms[roomId].players.includes(socket.id)) {
      // 移除玩家資訊
      rooms[roomId].playerpic = rooms[roomId].playerpic.filter(p => p.playerId !== socket.id);
      sendToClient(roomId, "allche", JSON.stringify(rooms[roomId].playerpic));
      sendToClient(roomId, "playerDisconnected", { playerId: socket.id });
        io.emit("updateRooms", rooms);  // 通知所有人更新房間清單
      // 房主離線或房間空了
      if (
        rooms[roomId].host === socket.id ||
        io.sockets.adapter.rooms.get(roomId)?.size === 0
      ) {
        rooms[roomId].ynstar = 0;
      } else {
        // 移除這名玩家
        rooms[roomId].players = rooms[roomId].players.filter(
          playerId => playerId !== socket.id
        );

        const allAI = rooms[roomId].players.every(
          id => typeof id === "string" && id.startsWith("AI")
        );

        if (allAI) {
          // 終止所有 AI worker
          for (const aiId of rooms[roomId].players) {
            if (aiWorkers[aiId]) {
              console.log("⚠️ AI 判定任務結束，準備退出", aiId);
              aiWorkers[aiId].postMessage({ eventName: "exitNow" }); // 雙保險
              aiWorkers[aiId].terminate();
              delete aiWorkers[aiId];
            }
          }

          console.log("✅ 房間只剩 AI，刪除房間:", roomId);
          delete rooms[roomId]; // ✅ 刪除整個房間
        io.emit("updateRooms", rooms);  // 通知所有人更新房間清單
        }
      }
    }
  }
});
    // 獲取房間清單
    socket.on("getRooms", () => {
        socket.emit("updateRooms", rooms);
    });

socket.on("wantinvit", (roomId) => {
  console.log("收到房間邀請AI", roomId);

  if (!rooms[roomId] || rooms[roomId].players.length >= 4) {
    return;
  }

  const aiId = `AI_${randomUUID()}`;

  rooms[roomId].players.push(aiId);

  const worker = runClient(aiId, roomId);

  // 等 Worker 建立完成後再發訊息
  worker.once("online", () => {
    worker.postMessage({
      eventName: "wantinvit",
      data: roomId,
    });

        console.log("玩家",aiId,"加入房間",roomId);

        sendToClient(roomId, "playerJoined", { playerId: aiId, roomSize: rooms[roomId].players.length });
socket.emit("updateRooms", rooms);

        if (rooms[roomId].players.length == 4) {
            befgame(roomId)
socket.emit("updateRooms", rooms);
            return;
        }


  });
});


function runClient(name, jorooms = '') {

const path = require('path');
const scripts = ['max.js', 'maxatk.js', 'maxsafe.js'];

const randomScript = scripts[Math.floor(Math.random() * scripts.length)];
const scriptPath = path.join(__dirname, randomScript); // 絕對安全

const worker = new Worker(scriptPath, {
  workerData: { name, jorooms }
});

  aiWorkers[name] = worker;
  workerToAiId.set(worker, name);  // ✅ 修正這裡，用 name 當作 aiId

  worker.on("message", (msg) => {
    const fromAiId = workerToAiId.get(worker); // 拿到 aiId

    if (eventHandlers[msg.eventName]) {
      eventHandlers[msg.eventName](msg.data, fromAiId);
    } else {
      console.warn("⚠️ AI 傳來未知事件：", msg.eventName);
    }
  });

return worker;

}
socket.on("invit", (data) => {

  const friendPin = data[0];
  const roomId = data[1];

console.log(roomId)

io.to(friendPin).emit("roomCreated", { roomId: data[1] });

});



function sendToClient(targetId, eventName, data) {
  if (rooms[targetId]) {
    // ✅ 發送給整個房間的所有玩家 + AI
    io.to(targetId).emit(eventName, data);
if(eventName=="outcard"){
socket.emit("outcardtohall", [targetId,data]);
}
    for (let pid of rooms[targetId].players) {
      if (aiWorkers[pid]) {
        aiWorkers[pid].postMessage({ eventName, data });
      }
    }

  } else {
    // ✅ 發送給個人
    io.to(targetId).emit(eventName, data);

    if (aiWorkers[targetId]) {
      aiWorkers[targetId].postMessage({ eventName, data });
    }
  }
}



const eventHandlers = {

wantinvit: (rooms) => {




///要做的事

},


myche: (che, from) => {

const  roomId=JSON.parse(che)[0]

rooms[roomId].playerpic.push({"che":JSON.parse(che)[1],"playerId":from});

io.to(roomId).emit("allche", JSON.stringify(rooms[roomId].playerpic));

socket.emit("updateRooms", rooms);

},

///////////////////////////

delroom: (roominf, from) => {///刪除房間

const  roomId=JSON.parse(roominf)[0]

console.log("刪除房間"+roomId)

delete rooms[roomId];

},

///////////////////////////

gamStar: (roomsinf, from) => {

const roomId=roomsinf

rooms[roomId].alps++

console.log("玩家準備就緒:"+rooms[roomId].alps)

if(rooms[roomId].alps==rooms[roomId].players.length){

rooms[roomId].alps=0

sratgame(roomId)

}

},

///////////////////////////


dice: (roomsinf, from) => {

const roomId=roomsinf

rooms[roomId].alps++

if(rooms[roomId].alps<rooms[roomId].players.length){

return

}

rooms[roomId].alps=0

rooms[roomId].dice1=Math.floor(Math.random() * 6+1);
rooms[roomId].dice2=Math.floor(Math.random() * 6+1);
rooms[roomId].dice3=Math.floor(Math.random() * 6+1);

sendToClient(roomId, "dice", JSON.stringify([rooms[roomId].dice1,rooms[roomId].dice2,rooms[roomId].dice3]))

},

///////////////////////////

myname: (roomsinf, from) => {

const roomId=roomsinf

console.log("莊家:"+rooms[roomId].players[rooms[roomId].makrs])

sendToClient(from, "myname", JSON.stringify([from,rooms[roomId].players,rooms[roomId].players[rooms[roomId].makrs]]));

},

///////////////////////////


epghpk: (epghpkinf, from) => {

const roomId=JSON.parse(epghpkinf)[0]
let mrs=JSON.parse(epghpkinf)[1]///返回的層級

if(mrs==3){

rooms[roomId].players2=rooms[roomId].players.concat(rooms[roomId].players)

mrs=17-(mrs+rooms[roomId].players2.indexOf(from,rooms[roomId].pled))

}

if (!rooms[roomId].epghpk[from]) rooms[roomId].epghpk[from] = [];

rooms[roomId].epghpk[from].push(mrs);

},

///////////////////////////


noepgh: (canephinf, from) => {

const roomId=JSON.parse(canephinf)[0]
const card=JSON.parse(canephinf)[1]

console.log("取消",card,from)

delete rooms[roomId].epghpk[from]

if(!rooms[roomId].epgh.some(obj => obj.ple === from)){

rooms[roomId].alps4[card]++

}

if(!rooms[roomId].epghpk2[from]){

rooms[roomId].epghpk2[from]=[0]

}

rooms[roomId].alps++

rooms[roomId].epgh.push({"num":0,"ple":from,"mtd":card,"dwo":"noepgh"})

needcaneph(roomId,from,[card,card,card])

},

///////////////////////////

eat: (canephinf, from) => {

const roomId=JSON.parse(canephinf)[0]
const card=JSON.parse(canephinf)[1]

console.log("吃"+card)

rooms[roomId].epgh.push({"num":1,"ple":from,"mtd":card,"dwo":"eat"})

console.log(rooms[roomId].epgh)

rooms[roomId].alps4[card[1]]++

needcaneph(roomId,from,card)


},

///////////////////////////

pon: (canephinf, from) => {

const roomId=JSON.parse(canephinf)[0]
const card=JSON.parse(canephinf)[1]

console.log("碰"+card)

rooms[roomId].epgh.push({"num":2,"ple":from,"mtd":card,"dwo":"pon"})

console.log(rooms[roomId].epgh)

rooms[roomId].alps4[card[1]]++

needcaneph(roomId,from,card)

},

///////////////////////////

gun: (canephinf, from) => {

const roomId=JSON.parse(canephinf)[0]
const card=JSON.parse(canephinf)[1]

console.log("槓"+card)

rooms[roomId].epgh.push({"num":2,"ple":from,"mtd":card,"dwo":"gun"})

rooms[roomId].resn=0

rooms[roomId].alps4[card[3]]++

needcaneph(roomId,from,card)

},

///////////////////////////

tin: (canephinf, from) => {

const roomId=JSON.parse(canephinf)[0]
const card=JSON.parse(canephinf)[1]

sendToClient(roomId, "caneph", JSON.stringify([from,card,"tin"]));

},

///////////////////////////

win: (canephinf, from) => {

const roomId=JSON.parse(canephinf)[0]
const card=JSON.parse(canephinf)[1]
const lbmgd=JSON.parse(canephinf)[2]
const flmgd=JSON.parse(canephinf)[3]
const etmgd=JSON.parse(canephinf)[4]

let mra=3

rooms[roomId].players2=rooms[roomId].players.concat(rooms[roomId].players)

mra=17-(mra+rooms[roomId].players2.indexOf(from,rooms[roomId].pled))

rooms[roomId].epgh.push({"num":mra,"ple":from,"mtd":card,"dwo":"win","lbmgd":lbmgd,"flmgd":flmgd,"etmgd":etmgd})

rooms[roomId].alps4[card[card.length-1]]++

needcaneph(roomId,from,card)

},

///////////////////////////

mywin: (canephinf, from) => {

const roomId=JSON.parse(canephinf)[0]
const card=JSON.parse(canephinf)[1]
const lbmgd=JSON.parse(canephinf)[2]
const flmgd=JSON.parse(canephinf)[3]
const etmgd=JSON.parse(canephinf)[4]

let mra=3

rooms[roomId].players2=rooms[roomId].players.concat(rooms[roomId].players)

mra=17-(mra+rooms[roomId].players2.indexOf(from,rooms[roomId].pled))

rooms[roomId].epgh.push({"num":mra,"ple":from,"mtd":card,"dwo":"mywin","lbmgd":lbmgd,"flmgd":flmgd,"etmgd":etmgd})

rooms[roomId].alps4[card[card.length-1]]++

needcaneph(roomId,from,card)

},

///////////////////////////

flower: (roomIdinf, from) => {

const roomId=JSON.parse(roomIdinf)[0]
const card=JSON.parse(roomIdinf)[1]

sendToClient(roomId, "flower", JSON.stringify([from ,card]));

console.log("玩家:"+from+"補花"+card)

},

///////////////////////////

getnewcard: (roomIdinf, from) => {

const roomId=JSON.parse(roomIdinf)[0]

if(rooms[roomId].allmgd2==128){

sendToClient(roomId, "nowin", []);

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

rooms[roomId].epgh=[]

rooms[roomId].epghpk={}

rooms[roomId].resn=0

console.log("剩下張數:"+(128-rooms[roomId].allmgd2))

console.log("發送給玩家:"+from+"牌:"+n)

sendToClient(roomId, "getnewcard2", JSON.stringify(from));

sendToClient(from, "getnewcard", JSON.stringify(n));

rooms[roomId].pled=rooms[roomId].players.indexOf(from)

}

},

///////////////////////////

needgetcardgun: (roomIdinf, from) => {

const roomId=JSON.parse(roomIdinf)[0]
const neepl=JSON.parse(roomIdinf)[1]

if(rooms[roomId].allmgd2==128){

sendToClient(roomId, "nowin", []);

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

rooms[roomId].epgh=[]

rooms[roomId].epghpk={}

rooms[roomId].resn=0

console.log("剩下張數:"+(128-rooms[roomId].allmgd2))

console.log("發送給玩家:"+neepl+"牌:"+n)

rooms[roomId].pled=rooms[roomId].players.indexOf(neepl)

sendToClient(roomId, "getnewcard2", JSON.stringify(neepl));

sendToClient(neepl, "getnewcard", JSON.stringify(n));

}

}

},

///////////////////////////

gunget: (roomIdinf, from) => {

const  roomId=JSON.parse(roomIdinf)[0]

if(rooms[roomId].allmgd2==128){

sendToClient(roomId, "nowin", []);

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

rooms[roomId].epgh=[]

rooms[roomId].epghpk={}

rooms[roomId].resn=0

console.log("剩下張數:"+(128-rooms[roomId].allmgd2))

console.log("發送給玩家:"+from+"牌:"+n)

sendToClient(roomId, "getnewcard2", JSON.stringify(from));

sendToClient(from, "getnewcard", JSON.stringify(n));

rooms[roomId].pled=rooms[roomId].players.indexOf(from)

}

},

///////////////////////////

outcard: (roomIdinf, from) => {

const  roomId=JSON.parse(roomIdinf)[0]
const card=JSON.parse(roomIdinf)[1]

rooms[roomId].card=[from ,card]
rooms[roomId].epgh=[]
rooms[roomId].epghpk={}

console.log("outcard",rooms[roomId].alps4,from,rooms[roomId].card)

if(rooms[roomId].alps4[rooms[roomId].resn]==rooms[roomId].players.length){

console.log("玩家:"+rooms[roomId].card[0]+"打出牌:"+rooms[roomId].card[1],rooms[roomId].alps)

rooms[roomId].pled=rooms[roomId].players.indexOf(rooms[roomId].card[0])

rooms[roomId].alps=0

rooms[roomId].alps4=[rooms[roomId].players.length,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

rooms[roomId].epgh=[]

rooms[roomId].epghpk={}

sendToClient(roomId, "outcard", JSON.stringify(rooms[roomId].card));

rooms[roomId].card=[]

}

},

///////////////////////////

outchak: (roomIdinf, from) => {

const  roomId=JSON.parse(roomIdinf)[0]
const card=JSON.parse(roomIdinf)[1]


rooms[roomId].outmgd[card]++


console.log("outchak",from,rooms[roomId].outmgd[card],card)

if(rooms[roomId].win==1){

rooms[roomId].alps=0

}

if(rooms[roomId].outmgd[card]==rooms[roomId].players.length){

console.log("確認各家吃碰槓胡",card,rooms[roomId].outmgd[card])

rooms[roomId].outmgd=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

rooms[roomId].alps=0

rooms[roomId].epgh=[]

rooms[roomId].epghpk2={}

rooms[roomId].alps4=[rooms[roomId].players.length,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

sendToClient(roomId, "outchak", JSON.stringify([from ,card]));

}

},

///////////////////////////

befbegin: (roomIdinf, from) => {

const  roomId=JSON.parse(roomIdinf)[0]

rooms[roomId].alps++

if(rooms[roomId].alps==4){

console.log("補花完畢")

rooms[roomId].alps=0

rooms[roomId].stat=1

sendToClient(roomId, "befbegin", []);

}

},

///////////////////////////

begin: (roomIdinf, from) => {

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

rooms[roomId].pled=rooms[roomId].makrs

console.log("開始打牌")

sendToClient(roomId, "getnewcard2", JSON.stringify(rooms[roomId].players[rooms[roomId].makrs]));

sendToClient(rooms[roomId].players[rooms[roomId].makrs], "getnewcard", JSON.stringify(n));

rooms[roomId].resn=0

}

},

///////////////////////////

needgetcard: (roomIdinf, from) => {

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

if(!rooms[roomId].epghpk2[from]){

rooms[roomId].alps++

rooms[roomId].alps4[rooms[roomId].resn]++

rooms[roomId].epghpk2[from]=[0]

}


console.log("needgetcard",from,resn,rooms[roomId].alps4[rooms[roomId].resn],rooms[roomId].card)




if(rooms[roomId].alps==rooms[roomId].players.length){

setTimeout(() => {

sendToClient(nexpled, "needgetcard", (""));

},300)

console.log(rooms[roomId].epghpk,rooms[roomId].alps,rooms[roomId].epgh)

rooms[roomId].epgh=[]

rooms[roomId].epghpk={}

rooms[roomId].card=[]

rooms[roomId].alps=0

rooms[roomId].epghpk2={}

rooms[roomId].alps4=[rooms[roomId].players.length,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

let nexpled=(rooms[roomId].pled+1<rooms[roomId].players.length)?rooms[roomId].players[rooms[roomId].pled+1]:rooms[roomId].players[0]

return

}


if(rooms[roomId].alps4[rooms[roomId].resn]==rooms[roomId].players.length&&rooms[roomId].card.length!=0){

console.log("玩家:"+rooms[roomId].card[0]+"打出牌:"+rooms[roomId].card[1],rooms[roomId].alps)

rooms[roomId].pled=rooms[roomId].players.indexOf(rooms[roomId].card[0])

rooms[roomId].alps=0

rooms[roomId].alps4=[rooms[roomId].players.length,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

sendToClient(roomId, "outcard", JSON.stringify(rooms[roomId].card));

rooms[roomId].card=[]

rooms[roomId].epgh=[]

rooms[roomId].epghpk={}

rooms[roomId].card=[]

return

}

}


}

///////////////////////////

socket.on("myche", (che) => {

eventHandlers["myche"](che,socket.id);

});

///////////////////////////

socket.on("delroom", (roominf) => {///刪除房間

eventHandlers["delroom"](roominf,socket.id);

});

///////////////////////////

socket.on("gamStar", (roomsinf) => {

eventHandlers["gamStar"](roomsinf,socket.id);

});

///////////////////////////

socket.on("dice", (roomsinf) => {

eventHandlers["dice"](roomsinf,socket.id);

});

///////////////////////////

socket.on("myname", (roomsinf) => {

eventHandlers["myname"](roomsinf,socket.id);

});

///////////////////////////

socket.on("epghpk", (epghpkinf) => {

eventHandlers["epghpk"](epghpkinf,socket.id);

});

///////////////////////////

socket.on("noepgh", (canephinf) => {

eventHandlers["noepgh"](canephinf,socket.id);

});

///////////////////////////

socket.on("eat", (canephinf) => {

eventHandlers["eat"](canephinf,socket.id);

});

///////////////////////////

socket.on("pon", (canephinf) => {

eventHandlers["pon"](canephinf,socket.id);

});

///////////////////////////

socket.on("gun", (canephinf) => {

eventHandlers["gun"](canephinf,socket.id);

});

///////////////////////////

socket.on("tin", (canephinf) => {

eventHandlers["tin"](canephinf,socket.id);

});

///////////////////////////

socket.on("win", (canephinf) => {

eventHandlers["win"](canephinf,socket.id);

});

///////////////////////////

socket.on("mywin", (canephinf) => {

eventHandlers["mywin"](canephinf,socket.id);

});

///////////////////////////

socket.on("flower", (roomIdinf) => {

eventHandlers["flower"](roomIdinf,socket.id);

});

///////////////////////////

socket.on("getnewcard", (roomIdinf) => {

eventHandlers["getnewcard"](roomIdinf,socket.id);

});

///////////////////////////

socket.on("needgetcardgun", (roomIdinf) => {

eventHandlers["needgetcardgun"](roomIdinf,socket.id);

});

///////////////////////////

socket.on("gunget", (roomIdinf) => {

eventHandlers["gunget"](roomIdinf,socket.id);

});

///////////////////////////

socket.on("outcard", (roomIdinf) => {

eventHandlers["outcard"](roomIdinf,socket.id);

});

///////////////////////////

socket.on("outchak", (roomIdinf) => {

eventHandlers["outchak"](roomIdinf,socket.id);

});

///////////////////////////

socket.on("befbegin", (roomIdinf) => {

eventHandlers["befbegin"](roomIdinf,socket.id);

});

///////////////////////////

socket.on("begin", (roomIdinf) => {

eventHandlers["begin"](roomIdinf,socket.id);

});

///////////////////////////

socket.on("needgetcard", (roomIdinf) => {

eventHandlers["needgetcard"](roomIdinf,socket.id);

});

///////////////////////////





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


///////////////////////////

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
rooms[roomId].epghpk2={}
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

socket.emit("updateRooms", rooms);

}


///////////////////////////

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
rooms[roomId].epghpk2={}
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

sendToClient(rooms[roomId].players[s], "star", JSON.stringify(plmgdnew));

}

rooms[roomId].alps=0

rooms[roomId].pled=rooms[roomId].makrs

rooms[roomId].allmgd2=64


}

///////////////////////////

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

if(rooms[roomId].epgh[i].ple==btoper&&btop!=0){



if(rooms[roomId].epgh[i].dwo=="gun"&&rooms[roomId].epgh[i].mtd[1]=="X"){

sendToClient(roomId, "caneph", JSON.stringify([rooms[roomId].epgh[i].ple,rooms[roomId].epgh[i].mtd,rooms[roomId].epgh[i].dwo]));

rooms[roomId].pled=rooms[roomId].players.indexOf(rooms[roomId].epgh[i].ple)

rooms[roomId].alps=0

rooms[roomId].epghpk={}

rooms[roomId].card=[]

rooms[roomId].epgh.splice(i, 1);


return

}///if(rooms[roomId].epgh[i].dwo=="gun"&&rooms[roomId].epgh[i].mtd[1]=="X"){



if(rooms[roomId].epgh[i].dwo!="win"&&rooms[roomId].epgh[i].dwo!="mywin"){

rooms[roomId].pled=rooms[roomId].players.indexOf(rooms[roomId].epgh[i].ple)

console.log(rooms[roomId].epgh[i].dwo,rooms[roomId].alps)

sendToClient(roomId, "caneph", JSON.stringify([rooms[roomId].epgh[i].ple,rooms[roomId].epgh[i].mtd,rooms[roomId].epgh[i].dwo]));

}///if(rooms[roomId].epgh[i].dwo!="win"&&rooms[roomId].epgh[i].dwo!="mywin"){




if(rooms[roomId].epgh[i].dwo=="win"||rooms[roomId].epgh[i].dwo=="mywin"){

sendToClient(roomId, "caneph", JSON.stringify([rooms[roomId].epgh[i].ple,rooms[roomId].epgh[i].mtd,"win",rooms[roomId].epgh[i].lbmgd,rooms[roomId].epgh[i].flmgd,rooms[roomId].epgh[i].etmgd]));

console.log("胡牌:"+rooms[roomId].players2.indexOf(rooms[roomId].epgh[i].ple))

console.log("莊家:"+rooms[roomId].makrs)

if(rooms[roomId].players2.indexOf(rooms[roomId].epgh[i].ple)!=rooms[roomId].makrs){

rooms[roomId].makrs=(rooms[roomId].makrs+1<4)?rooms[roomId].makrs+1:0

}///if(rooms[roomId].players2.indexOf(rooms[roomId].epgh[i].ple)!=rooms[roomId].makrs){

rooms[roomId].win=1

rooms[roomId].card=[]

console.log("新莊家:"+rooms[roomId].makrs)

}///if(rooms[roomId].epgh[i].dwo=="win"||rooms[roomId].epgh[i].dwo=="mywin"){

rooms[roomId].epgh.splice(i, 1);

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

sendToClient(nexpled, "needgetcard", (""));

},300)

console.log(rooms[roomId].epghpk,rooms[roomId].alps,rooms[roomId].epgh)

rooms[roomId].epgh=[]

rooms[roomId].epghpk={}

rooms[roomId].card=[]

rooms[roomId].alps=0

rooms[roomId].epghpk2={}

rooms[roomId].alps4=[rooms[roomId].players.length,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

let nexpled=(rooms[roomId].pled+1<rooms[roomId].players.length)?rooms[roomId].players[rooms[roomId].pled+1]:rooms[roomId].players[0]

return

}


if(rooms[roomId].alps4[card[1]]==rooms[roomId].players.length&&rooms[roomId].card.length!=0){

console.log("玩家:"+rooms[roomId].card[0]+"打出牌:"+rooms[roomId].card[1],rooms[roomId].alps)

rooms[roomId].pled=rooms[roomId].players.indexOf(rooms[roomId].card[0])

rooms[roomId].alps=0

rooms[roomId].alps3=0

rooms[roomId].epgh=[]

rooms[roomId].epghpk={}

rooms[roomId].alps4=[rooms[roomId].players.length,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

sendToClient(roomId, "outcard", JSON.stringify(rooms[roomId].card));

rooms[roomId].card=[]

return

}

}

});


const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
    console.log(`伺服器運行中： http://localhost:${PORT}`);
});

