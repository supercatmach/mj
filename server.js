const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const helmet = require('helmet');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// 使用 Helmet 來設置 CSP
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"], // 預設來源
            connectSrc: ["'self'", 'https://mj-5x4w.onrender.com'] // 允許從 Render 上的伺服器連接
        }
    }
}));

// 其他伺服器設定
app.get("/", (req, res) => {
    res.send("麻將遊戲伺服器運行中");
});

const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
    console.log(`伺服器運行在 http://localhost:${PORT}`);
});
