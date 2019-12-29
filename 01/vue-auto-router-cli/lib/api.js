const { clone } = require("./download");
const fs = require("fs");
const handlebars = require("handlebars");
const symbols = require("log-symbols"); // 显示特殊字符
const chalk = require("chalk"); // 颜色

module.exports.init = async name => {
  console.log("🔥创建项目:" + name);
  await clone("su37josephxia/vue-template", name);
};

module.exports.refresh = async () => {
  // 读取页面列表
  const list = fs
    .readdirSync("./src/views")
    .filter(v => v !== "Home.vue")
    .map(v => ({
      name: v.replace(".vue", "").toLowerCase(),
      file: v
    }));

  // 生成路由定义
  compile(
    {
      list
    },
    "./src/router.js",
    "./template/router.js.hbs"
  );

  // 生成菜单
  compile(
    {
      list
    },
    "./src/App.vue",
    "./template/App.vue.hbs"
  );
};

function compile(meta, filePath, templatePath) {
  if (fs.existsSync(templatePath)) {
    const content = fs.readFileSync(templatePath).toString();
    const result = handlebars.compile(content)(meta);
    fs.writeFileSync(filePath, result);
    console.log(symbols.success, chalk.green(`🔥${filePath} 创建成功`));
  }
}
