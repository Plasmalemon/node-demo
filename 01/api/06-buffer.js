// stream 是用于与node中流数据交互的接口

const fs = require("fs");
const rs = fs.createReadStream("./1.png");
const ws = fs.createWriteStream("./2.png");
rs.pipe(ws);
