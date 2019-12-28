// buffer

// 创建一个长度为10字节以0填充的Buffer
const buf1 = Buffer.alloc(10);
console.log(buf1);

//
const buf2 = Buffer.from("a");
console.log(buf2);

//创建
const buf3 = Buffer.from("中文");
//读取
console.log("buf3", buf3.toString());

// 合成
const buf4 = Buffer.concat([buf2, buf3]);
console.log("buf4", buf4, buf4.toString());

// 读取数据
buf1.write("hello");
console.log(buf1.toString());

// 创建 个Buffer包含ascii.
// ascii 查询 http://ascii.911cha.com/

// 创建Buffer包含UTF-8字节
// UFT-8: 种变 的编码 案，使  1~6 个字节来存储;
// UFT-32: 种固定 度的编码 案， 管字符编号  ，始终使  4 个字节来存储;
// UTF-16:介于 UTF-8 和 UTF-32 之间，使  2 个或者 4 个字节来存储， 度既固定 可变。

// 支持的字符串编码类型
// ASCII
// UTF-8
// UTF-16LE/UCS-2
// Base64
// Binary
// Hex

// 更多请看
// http://nodejs.cn/api/buffer.html
