'use strict';
// 通过解析 icon.scss 最终导出 icon.json 文件，该文件保存了各种图标
var postcss = require('postcss');
var fs = require('fs');
var path = require('path');
var fontFile = fs.readFileSync(path.resolve(__dirname, '../../packages/theme-chalk/src/icon.scss'), 'utf8');
var nodes = postcss.parse(fontFile).nodes;
var classList = [];
// 遍历匹配正则，符合则传入到数组中
nodes.forEach((node) => {
  var selector = node.selector || '';
  var reg = new RegExp(/\.af-icon-([^:]+):before/);
  var arr = selector.match(reg);

  if (arr && arr[1]) {
    classList.push(arr[1]);
  }
});
// 导出 icon.json 文件
fs.writeFile(path.resolve(__dirname, '../../examples/icon.json'), JSON.stringify(classList), () => {});
