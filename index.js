// ref:
// - https://umijs.org/plugin/develop.html
const path = require('path');
const fs = require('fs');
const { findRoutes } = require('./utils');
const chalk = require('chalk');
const deeplyAssign = require('deeplyassign').default;

module.exports = function(api, options) {
  const { paths, log } = api;
  const arg = process.argv.slice(3)[0];

  try {
    const routePath = path.resolve(paths.cwd, 'config/route');
    const routeFd = fs.statSync(routePath, { withFileTypes: true });
    if (routeFd.isDirectory()) {
      if (findRoutes(routePath).includes(arg)) {
        const route = require(path.resolve(routePath, arg)).default;
        api.modifyRoutes(() => {
          log.success(`已加载 ${chalk.green(arg)} 的路由信息`);
          return route;
        });
      } else {
        log.error(`未检查到 ${chalk.red(arg)} 的路由信息
           尝试如下命令启动：\n
              ${chalk.green(r.map(i => `yarn start ${i}`).join('\n\t\t'))}
        `);
        process.exit(0);
      }
    }
  } catch (error) {
    try {
      const routePath = path.resolve(paths.cwd, 'config/route.js');
      const routeFd = fs.statSync(routePath, { withFileTypes: true });
      const route = require(routePath).default;
      api.modifyRoutes(() => {
        log.success(`已加载路由信息`);
        return route;
      });
    } catch (error) {
      log.error(new Error('无路由信息'));
      process.exit(1);
    }
  }

  try {
    const configPath = path.resolve(paths.cwd, 'config/config');
    const configFd = fs.statSync(configPath, { withFileTypes: true });
    const config = require(configPath).default;
    api.modifyDefaultConfig(() => {
      if (configFd.isDirectory() && findRoutes(configPath).includes(arg)) {
        const locaConfig = require(path.resolve(configPath, arg)).default;
        log.success(`已合并 ${arg} 的配置`);
        return deeplyAssign({}, config, locaConfig);
      } 
      log.success(`已加载配置`);
      return config
    });
  } catch (error) {

    try {
      const configPath = path.resolve(paths.cwd, 'config/config.js');
      const configFd = fs.statSync(configPath, { withFileTypes: true });
      const config = require(configPath).default;
      api.modifyDefaultConfig(() => {
        log.success(`已加载配置`);
        return config;
      });
    } catch (error) {
      log.error(new Error('无配置信息'));
      process.exit(1);
    }
  }
};
