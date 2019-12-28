const http = require("http");

const session = {};

http
  .createServer((req, res) => {
    console.log("Cookie:", req.headers.cookie);

    const sessionKey = "sid";
    const cookie = req.headers.cookie;
    if (cookie && cookie.indexOf(sessionKey) > -1) {
      res.end("Come back");
      const pattern = new RegExp(`${sessionKey}=([^;]+);?\s*`);
      const sid = pattern.exec(cookie)[1];
      console.log("session", sid, session, session[sid]);
    } else {
      const sid = (Math.random() * 9999999).toFixed();
      // 设置cookie
      res.setHeader("Set-Cookie", `${sessionKey}=${sid}`);
      session[sid] = {
        name: "Laowang"
      };
      res.end("Hello");
    }
  })
  .listen(3000);

//   实现原 :
// 1. 服务器在接受客户端首次访问时在服务器端创建seesion，然后保存seesion(我们可以将seesion保存在内存中，也可以保存在redis中，推荐使用后者)，然后给这个session生成一个唯一的标识字符 ,然后在响应头中种下这个唯一标识字符 。
// 2. 签名。这一步通过秘钥对sid进行签名处 ，避免客户端修改sid。(非必需步骤)
// 3. 浏览器中收到请求响应的时候会解析响应头，然后将sid保存在本地cookie中，浏览器在下次http请求的请求头中会带上该域名下的cookie信息，
// 4. 服务器在接受客户端请求时会去解析请求头cookie中的sid，然后根据这个sid去找服务端保存的该客户端的session，然后判断该请求是否合法。
