// 文件系统操作的常用方法

const fs = require('fs');
const join = require('path').join;

function findRoutes(sPath) {
  let routes = [];
  function finder(path) {
    let files = fs.readdirSync(path);
    files.forEach((val, index) => {
      let fPath = join(path, val);
      let stats = fs.statSync(fPath);
      if (stats.isDirectory()) finder(fPath);
      if (stats.isFile()) routes.push(val.replace('.js', ''));
    });
  }
  finder(sPath);
  return routes;
}

function checkDirNum(path) {
  let count = 0;
  fs.readdirSync(path).forEach(file => {
    let curPath = path + '/' + file;
    // 判断是否文件夹
    if (fs.statSync(curPath).isDirectory()) {
      count++;
    }
  });
  return count;
}

module.exports = {
  findRoutes, // 检查存在路由表
  checkDirNum, // 检查相应目录下的文件夹数量(即略过文件)
};
