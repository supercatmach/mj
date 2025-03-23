const express = require('express');
const helmet = require('helmet');
const app = express();

// 使用 helmet 來設置 CSP
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.socket.io"],
    connectSrc: ["'self'", "https://mj-5x4w.onrender.com"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'"],
  },
}));

// 你的其他 Express 路由和設定...

// 伺服器端口
const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
