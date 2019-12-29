const http = require("http");

class Koa {
  listen(...args) {
    // 启动一个http实例, 并且去调用use中间件传进来的callback
    const server = http.createServer((req, res) => {
      this.callback(req, res);
    });
    server.listen(...args);
  }

  use(callback) {
    this.callback = callback;
  }
}

module.exports = Koa;
