import * as glob from "glob";
import * as Koa from "koa";
import * as KoaRouter from "koa-router";

type HTTPMethod = "get" | "put" | "del" | "post" | "patch";
type LoadOptions = {
  /**
   * 路由文件扩展名，默认值是`.{js,ts}` */
  extname?: string;
};
type RouteOptions = {
  /**
   * 适用于某个请求比较特殊，需要单独制定前缀的情形
   */
  prefix?: string;
  /**
   * 给当前路由添加一个或多个中间件
   */
  middlewares?: Array<Koa.Middleware>;
};

const router = new KoaRouter();

// router.get('/user', async ctx => {})
// target[property] 和 descriptor.value 是一样的

// export const get = (path: string, options?: RouteOptions) => {
//   return (target, property, descriptor) => {
//     const url = options && options.prefix ? options.prefix + path : path;
//     router["get"](url, target[property]);
//   };
// };

// 第一次升阶 ,解决get post多方法问题, router变量不符合函数引用透明,
// export const method = method => (path: string, options?: RouteOptions) => {
//   return (target, property, descriptor) => {
//     const url = options && options.prefix ? options.prefix + path : path;
//     router[method](url, target[property]);
//   };
// };

// 第二次升阶  解决router变量问题, 不符合函数引用透明,
export const decorate = (
  method: HTTPMethod,
  path: string,
  options: RouteOptions = {},
  router: KoaRouter
) => {
  return (target, property, descriptor) => {
    const middlewares = [];
    // 首先是参数传进来的中间件//
    if (options.middlewares) {
      middlewares.push(...options.middlewares);
    }
    // 不用输入固定的功能,可以根据需要写入中间件,很灵活
    const url = options && options.prefix ? options.prefix + path : path;
    console.log("method", method);

    // 正常的业务中间件
    middlewares.push(target[property]);
    router[method](url, target[property]);
  };
};

const method = method => (path: string, options?: RouteOptions) =>
  decorate(method, path, options, router);

export const get = method("get");
export const post = method("post");

export const load = (folder: string, options: LoadOptions = {}): KoaRouter => {
  // 自动遍历文件夹, 通常用readdirsync 这里用glob
  const extname = options.extname || ".{js,ts}";
  glob
    .sync(require("path").join(folder, `./**/*${extname}`))
    .forEach(item => require(item));
  console.log("router", router);

  return router;
};
