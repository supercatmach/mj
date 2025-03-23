const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

// 🔹 讓 Express 提供靜態檔案（如果你有前端 HTML/CSS）
app.use(express.static("public"));

// 🔹 設定首頁路由，確保 Render 伺服器有回應
app.get("/", (req, res) => {
    res.send("伺服器運行中！🎉 你的 WebSocket 也可以使用");
});

// 🔹 WebSocket 連線
io.on("connection", (socket) => {
    console.log("有新的用戶連線！", socket.id);
    socket.on("disconnect", () => {
        console.log("用戶已斷線");
    });
});

// 🔹 啟動伺服器
const PORT = process.env.PORT || 10000;
http.listen(PORT, () => {
    console.log(`伺服器運行在 http://localhost:${PORT}`);
});
