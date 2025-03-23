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

io.on("connection", (socket) => {
    console.log(`玩家已連線: ${socket.id}`);

    // 監聽訊息發送事件
    socket.on("name", (pled) => {

        io.emit("pledonline", JSON.stringify([pled,socket.id]));
    });

    // 監聽訊息發送事件
    socket.on("message", (msg) => {

        console.log(socket.id+`說: ${msg}`);

        // 廣播訊息給所有玩家
        io.emit("message", JSON.stringify([socket.id,msg]));
    });

    socket.on("disconnect", () => {

io.emit("pledoffline", JSON.stringify(socket.id));

        console.log(`玩家已斷線: ${socket.id}`);
    });
});

const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
    console.log(`伺服器運行中： http://localhost:${PORT}`);
});
