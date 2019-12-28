// fs 文件系统
const fs = require("fs");

// 同步调用
const data = fs.readFileSync("./download.js");
// 实际输出的是Buffer类型
// console.log("data", data, data.toString());

// 异步调用
fs.readFile("./download.js", (err, data) => {
  if (err) throw err;
  //   console.log("data", data.toString());
});

// fs常常搭配path api使用
const path = require("path");

fs.readFile(
  path.resolve(path.resolve(__dirname, "./download.js")),
  (err, data) => {
    if (err) throw err;
    // console.log(data);
  }
);

// console.log(path.join("/foo", "bar", "baz/asdf", "quux", ".."));

// path.rosolve()方法可以将多个路径解析为一个规范化的绝对路径,类似执行cd操作
//(不会利用底层的文件系统判断路径是否存在，而只是进行路径字符串操作)
// 遇到/就解析为根路径, 从右向左解析,

//path.join() 方法使用平台特定的分隔符作为定界符将所有给定的 path 片段连接在一起，然后规范化生成的路径
// 拼接路劲字符串

// fs.promises API node v10
const fsp = require("fs").promises;

fsp
  .readFile("./download.js")
  .then(data => console.log(data.toString()))
  .then(err => console.log(err));

//  async/await
(async () => {
  const fs = require("fs");
  const { promisify } = require("util");
  const readFile = promisify(fs.readFile);
  const data = await readFile("./download.js");
  console.log("data", data.toString());

  // 引用方式
  const fileBuffer = Buffer.from(data).toString("utf-8");
  console.log("fileBuffer", fileBuffer);
})();

// async/await 先输出  promisify 后输出
