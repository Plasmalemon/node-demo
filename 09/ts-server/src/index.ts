import * as koa from "koa";
import * as bodify from "koa-body";
import * as serve from "koa-static";
import * as timing from "koa-xtime";

const app = new koa();

app.use(timing());
app.use(serve(`${__dirname}/`));

app.use(bodify());

// app.use((ctx: koa.Context) => {
//   ctx.body = "Hello Ts";
// });

import { load } from "./utils/route-decors";
import { resolve } from "path";

const router = load(resolve(__dirname, "./routes"));
app.use(router.routes());

app.listen(3000, () => {
  console.log(`服务器启动成功: ${3000}`);
});
