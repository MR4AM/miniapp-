# miniapp-
##基于wepy小程序框架开发的小程序通用组件市场
### 基于wepy 搭建
- npm install wepy-cli -g  全局安装或更新WePY命令行工具
- wepy init standard projectname 创建项目名为projectname的项目,项目初始化时暂时不使用ESlint、redux,由于ESlint较为严格，而redux目前项目中使用的情况并不多见
- cd projectname 进入项目目录
- npm i 安装依赖包
- npm run dev 运行编译测试环境
- npm run bulid  运行编译正式环境
### 启动
- npm i
- npm run dev 运行编译测试环境
- npm run bulid  运行编译正式环境
- 使用微信开发者工具打开编译后的dist文件，这是wepy基于vue基础语法编译后生成的wxpage文件，可以在微信小程序上运行。
