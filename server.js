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

    // 當有新玩家連接時，發送先前的所有訊息
    socket.emit("previousMessages", messages);

    // 監聽訊息發送事件
    socket.on("message", (msg) => {
        console.log(`收到訊息: ${msg}`);
        // 儲存訊息
        messages.push(msg);
        // 廣播訊息給所有玩家
        io.emit("message", msg);
    });

    socket.on("disconnect", () => {
        console.log(`玩家已斷線: ${socket.id}`);
    });
});

const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
    console.log(`伺服器運行中： http://localhost:${PORT}`);
});
