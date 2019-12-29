- 概述: koa 是一个新的 _web 框架_, 致力于成为 _web 应用_ 和 *API 开发*领域中的一个更小 更富有表现力 更健壮的基石

koa 是 Express 的下一代基于 Node.js 的 web 框架
koa2 完全使用 Promise 并配合`async`来实现异步

- 特点:
  1. 轻量, 无捆绑
  2. 完全的中间件架构
  3. 优雅的 API 设计
  4. 增强的错误处理

* 解决原生 http 的不足, 作为通用库对协议的浅层封装

  1. 令人困惑的 request 和 response
     res.end() res.writeHead()
  2. 对复杂业务描述的不足, 流程描述 和切面描述(AOP)
     鉴权, 语言级别, 框架级别, 日志

     切面描述有语言级别 和 框架级别
     比如 redux 中间件 axios intercpter 路由守卫
