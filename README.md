
# A Vue.js 2.0 UI Toolkit for Web

## Install
```shell
npm install aui -S
```

## Quick Start
``` javascript
import Vue from 'vue'
import Element from 'aui'

Vue.use(Element)

// or
import {
  Select,
  Button
  // ...
} from 'aui'

Vue.component(Select.name, Select)
Vue.component(Button.name, Button)
```
For more information, please refer to [Quick Start](http://) in our documentation.

## Browser Support
主流浏览器和Internet Explorer 10+.

## 开发规范

### Commit 规范
遵循angular commit规范
> x代表具体的组件，全部可用 * ，如: `feat(button): 添加loading状态`
- feat(x): 功能特性
- fix(x): 修复bug
- docs(x): 文档或注释的修改
- style(x): 修改样式
- refactor(x)： 重构代码
- test(x): 测试用例改动
- chore: 构建过程或辅助工具的变动
- merge: 合并代码 



### Pull Request 规范
- 请先 fork 一份到自己的项目下，不要直接在仓库下建分支。

- commit 信息要以`[组件名]: 描述信息` 的形式填写，例如 `Button: fix xxx bug`。

- **不要提交** `lib` 里面打包的文件。

- 执行 `npm run dist` 后可以正确打包文件。

- 为了兼容性以及最终打包的文件体积考虑，我们的 babel 只引入了 `preset-2015`，所以不建议使用 ES2015 的 API，例如 `Array.prototype.find`、`Object.assign`等。如果有需要，请引入第三方的 polyfill。

- 提交 PR 前请 rebase，确保 commit 记录的整洁。

- 确保 PR 是提交到 `dev` 分支，而不是 `master` 分支。

- 如果是修复 bug，请在 PR 中给出描述信息。

- 合并代码需要两名维护人员参与：一人进行 review 后 approve，另一人再次 review，通过后即可合并。

### 开发环境搭建

首先你需要 Node.js 4+，yarn 和 npm 3+。注意：我们使用 yarn 进行依赖版本的锁定，所以请不要使用 `npm install` 安装依赖。
```shell
# 需要在office网络中访问
git clone http://192.168.101.240:8090/view/AUI.git
npm run dev

# open http://localhost:8088
```

运行playbook：

```shell
npm run dev:play
```

单元测试：

```shell
npm run test
```

打包代码：

```shell
npm run dist
```

### 组件开发规范
- 通过 `make new` 创建组件目录结构，包含测试代码、入口文件、文档
- 如果包含父子组件，需要更改目录结构，参考 `Button`
- 组件内如果依赖了其他组件，需要在当前组件内引入，参考 `Select`
- 每个组件内需要包含测试目录`__test__`

### 代码规范
- css 遵循 [BEM规范](https://en.bem.info/methodology/quick-start/) 
- js遵循饿了么前端的 [ESLint](https://github.com/ElemeFE/eslint-config-elemefe) 即可

## Changelog
Detailed changes for each release are documented in the [release notes](https://github.com/ElemeFE/element/releases).
