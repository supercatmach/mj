// 引入所需的模組
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const helmet = require('helmet');

// 初始化應用程式
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// 設置 Content Security Policy (CSP)
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"], // 允許網站加載自身的資源
        scriptSrc: ["'self'", "https://cdn.socket.io", "'unsafe-inline'"], // 允許從 cdn.socket.io 加載腳本及內嵌代碼
        connectSrc: ["'self'", "https://mj-5x4w.onrender.com"], // 允許 socket.io 連接
      },
    },
  })
);

// 靜態文件服務
app.use(express.static('public'));

// 當客戶端連接時
io.on('connection', (socket) => {
  console.log('A user connected');

  // 接收訊息並發送到所有連線的客戶端
  socket.on('message', (msg) => {
    console.log('Received message: ' + msg);
    io.emit('message', msg); // 將訊息發送給所有連線的用戶
  });

  // 客戶端斷開連線時的處理
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// 設置伺服器端口
const port = process.env.PORT || 10000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
