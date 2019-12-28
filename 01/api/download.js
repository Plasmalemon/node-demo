module.exports.clone = async function clone(repo, desc) {
  const { promisify } = require("util");
  const dowload = promisify(require("download-git-repo"));
  //显示进度条
  const ora = require("ora");
  const process = ora(`下载....项目`);
  process.start();

  try {
    await dowload(repo, desc);
  } catch (error) {
    process.fail();
  }
  process.succeed();
};
