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

// 當有玩家連線時
io.on("connection", (socket) => {
    console.log(`玩家已連線: ${socket.id}`);

    // 監聽「message」事件
    socket.on("message", (msg) => {
        console.log(`收到訊息: ${msg}`);
        io.emit("message", msg); // 把訊息發送給所有人
    });

    // 當玩家斷線時
    socket.on("disconnect", () => {
        console.log(`玩家已斷線: ${socket.id}`);
    });
});

// 設定伺服器的監聽埠
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`伺服器運行中： http://localhost:${PORT}`);
});
