const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// 設置 CORS 允許來自所有來源
app.use(cors());

// 其他伺服器設定
app.get("/", (req, res) => {
    res.send("麻將遊戲伺服器運行中");
});

const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
    console.log(`伺服器運行在 http://localhost:${PORT}`);
});
