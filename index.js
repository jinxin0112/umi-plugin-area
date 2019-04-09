// ref:
// - https://umijs.org/plugin/develop.html
const path = require('path');
const fs = require('fs');
const { findRoutes } = require('./utils');
const chalk = require('chalk');

module.exports = function(api, options) {
  const { paths, log } = api;
  const arg = process.argv.slice(3)[0];

  try {
    const routePath = path.resolve(paths.cwd, 'config/route');
    const routeFd = fs.statSync(routePath, { withFileTypes: true });
    if (routeFd.isDirectory()) {
      const r = findRoutes(routePath);
      if (arg && r.includes(arg)) {
        const route = require(path.resolve(routePath, arg)).default || [];
        api.modifyRoutes(() => {
          log.success(`已加载 ${chalk.green(arg)} 的路由信息`);
          return route;
        });
      } else {
        log.error(`${
          arg ? `未检查到 ${chalk.red(arg)} 的路由信息` : `未指定路由信息`
        }
             尝试如下命令启动：\n
                ${chalk.green(r.map(i => `umi dev ${i}`).join('\n\t\t'))}
          `);
        process.exit(0);
      }
    }
  } catch (error) {
    try {
      const routePath = path.resolve(paths.cwd, 'config/route.js');
      const routeFd = fs.statSync(routePath, { withFileTypes: true });
      const route = require(routePath).default || [];
      api.modifyRoutes(() => {
        log.success(`已加载路由信息`);
        return route;
      });
    } catch (error) {
      log.error('无路由信息');
      process.exit(0);
    }
  }
};
