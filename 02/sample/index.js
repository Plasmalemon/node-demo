const Koa = require("koa");
const app = new Koa();

app.use(async (ctx, next) => {
  const start = new Date().getTime();
  console.log(`start ${ctx.url}`);
  await next();

  const end = new Date().getTime();

  console.log(`请求${ctx.url} 耗时${end - start}毫秒`);
});

app.use((ctx, next) => {
  console.log("=====next=======");
  ctx.body = [
    {
      name: "ken"
    }
  ];
});

app.listen(3000);
