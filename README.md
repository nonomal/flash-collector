# Flash Collector （小游戏收集器）

小游戏收集器，一键下载、本地运行小游戏，并与你的同伴分享游戏文件

## 特性

- 一键解析下载 Flash 和 Unity3D Web 小游戏
- 在本地运行 Flash 和 Unity3D Web 小游戏
- 一键解析并保存 HTML5 小游戏真实页面
- 自动添加 Referer 绕过 HTML5 小游戏真实页面请求限制
- 登录站点自动获取cookie、Referer / UA请求模拟，避免触发站点反爬策略
- 自动检测并安装必要的运行库
- 原生支持 4399 和 7k7k 两大站点
- 模块化设计，可拓展小游戏站点支持

## 登录

解析与下载功能需要实名制登录对应的网站，请确保你已经成年并拥有相应网站的实名制认证账号

## 下载

访问 [Releases](https://github.com/Cnotech/flash-collector/releases) 页面

## 反馈

如果遇到无法解析或解析为 HTML5 的 **Flash 或 Unity3D 游戏**请[新建 issue](https://github.com/Cnotech/flash-collector/issues)，**不接受 HTML5 或页游的反馈请求**

## 拓展小游戏网站支持

定位到 `./packages/main/modules`，编写并在 `_register.ts` 中注册你的模块

## 调试

执行 `yarn dev`

## 编译

执行 `yarn build`，如果你在默认路径安装了 7-Zip 则会将压缩包生成至 `release` 目录

## 条款

使用此软件及其相关内容即表示您同意下述条款：

1. 该仓库的代码以及编译后的可执行文件（包括发布的软件）仅供个人交流学习使用，作者不对以任何形式使用这些代码或可执行文件造成的后果负责；
2. 禁止任何个人或组织将此软件及其相关内容用作商业用途，使用开源代码时必须严格遵守 MPL2.0 协议；
3. 本软件及其仓库是 Flash Collector 字样及下图所示图标（渐变绿底 FC 字）的最早使用者，任何个人或组织不得未经授权使用相关字样或图标。

<div align=center>
    <img src="retinue/favicon.ico"/>
</div>
