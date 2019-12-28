const http = require("http");

http
  .createServer((req, res) => {
    if (req.url === "/favicon.ico") {
      res.end("");
      return;
    }

    // 观察
    console.log("cookie:", req.headers.cookie);

    // 设置
    res.setHeader("Set-Cookie", "cookie1=123");

    res.end("hello cookie");
  })
  .listen(3000);

// cookie
// 文件不能存太大
// 存储于浏览器端 可以看的见 可以被篡改
