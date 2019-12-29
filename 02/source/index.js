const Koa = require("./koa");
const app = new Koa();
app.use((req, res) => {
  res.writeHead(200);
  res.end("hi koa");
});

app.listen(3000, () => {
  console.log(`监听端口 3000`);
});
