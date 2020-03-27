// 获取 version，定义了一个 content，如果当前版本不在 content 中，那么再添加一个版本数据
var fs = require('fs');
var path = require('path');
var version = process.env.VERSION || require('../../package.json').version;
var content = { '0.0.1': '0.0.1' };
if (!content[version]) content[version] = '0.0.1';
fs.writeFileSync(path.resolve(__dirname, '../../examples/versions.json'), JSON.stringify(content));
