// http 模块用于创建web服务器

const http = require("http");
const fs = require("fs");
const server = http.createServer((request, response) => {
  //   console.log("request", getPrototypeChain(request));
  //   console.log("response", getPrototypeChain(response));
  // request 和 response 继承于 Stream { pipe: [Function] }, 是一个流
  // response.end("Hello Node");

  // 服务器内部错误用 writeHead  404 和 200 状态用setHeader
  const { url, method, headers } = request;
  if (url === "/" && method === "GET") {
    fs.readFile("./index.html", (err, res) => {
      if (err) {
        response.writeHead(500, { "Content-Type": "text/plain;charset=utf-8" });
        response.end("500, 服务器错误");
        return;
      }
      response.statusCode = 200;
      response.setHeader("Content-Type", "text/html");
      response.end(res);
    });
  } else if (url === "/users" && method === "GET") {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ name: "laowang" }));
  } else if (method === "GET" && headers.accept.indexOf("image/*") !== -1) {
    fs.createReadStream("." + url).pipe(response);
    console.log("url", url);
  } else {
    response.statusCode = 404;
    response.setHeader("Content-Type", "text/plain;charset=utf-8");
    response.end("404, 页面找不到了");
    // end 是个多态
  }
});
server.listen(3000);

function getPrototypeChain(obj) {
  var protoChain = [];

  // 返回给定对象的原型, 如果没有就返回null
  while ((obj = Object.getPrototypeOf(obj))) {
    protoChain.push(obj);
  }
  protoChain.push(null);

  return protoChain;
}

// Content-Type 类型
// https://www.runoob.com/http/http-content-type.html

// setHeader 可以设置多次
// writeHead 只可以设置一次
// http://nodejs.cn/api/http.html#http_request_setheader_name_value

// Accept代表发送端(客户端)希望接受的数据类型。比如:Accept:text/xml; 代表客户端希望接受的数据类型是xml类型。
// Content-Type代表发送端(客户端|服务器)发送的实体数据的数据类型。 比如:Content- Type:text/html; 代表发送端发送的数据格式是html。
// 二者合起来， Accept:text/xml; Content-Type:text/html ，即代表希望接受的数据类型是xml格式，本次请求发送的数据的数据格式是html。
