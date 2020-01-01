import * as Koa from "koa";
import { get, post } from "../utils/route-decors";

const users = [{ name: "tom" }];

export default class User {
  @get("/users")
  public list(ctx: Koa.Context) {
    console.log("//");
    ctx.body = { ok: 1, data: users };
  }
  @post("/users")
  public add(ctx: Koa.Context) {
    users.push(ctx.request.body);
    ctx.body = { ok: 1 };
  }
}
