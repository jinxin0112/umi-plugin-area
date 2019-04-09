# umi-plugin-area

[![NPM version](https://img.shields.io/npm/v/umi-plugin-area.svg?style=flat)](https://npmjs.org/package/umi-plugin-area)
[![NPM downloads](http://img.shields.io/npm/dm/umi-plugin-area.svg?style=flat)](https://npmjs.org/package/umi-plugin-area)

通过约定式解决 route 多版本的方案。

## 何时使用

当项目的 route 有多个版本的时候

## 使用

1. 在`.umirc.js`中添加插件,

```js
export default {
  plugins: [
    ['umi-plugin-area'],
  ],
}
```
2. 在根目录下的 config 目录下创建 route
  - 如果 route 是 js 文件并返回单一路由信息则默认启动该 route 
  - 如果 route 是文件夹， 则需要在启动命令后加入对应 route 版本的参数
    
    例如：
    ```
    ├── config
    │   └── route
    │       ├── ChongQing.js
    │       └── SiChuan.js
    └── pages
      ├── index.css
      └── index.js
    ```
    启用命令后需加入 ChongQing 或者 SiChuan



## LICENSE

MIT
