# doraemon

> 影音多媒体管理软件

#### 使用技术栈
- 主程序：Electron框架
- Build Tool：electron-builder
- 前端框架：Vue 2.0
- 前端UI组件库：View UI
- 视频播放器：xgplayer
- 数据存储：NeDB
- HTTP库：axios
- 爬虫DOM处理：cheeiro
- 资源下载：aria2
- 视频转码：ffmpeg

#### Demo图
![image](https://github.com/william-sv/doraemon/blob/master/doc/demo.png)

#### 实现功能
- [x] 播放本地视频文件
  - [ ] ffmpeg转码
- [x] 管理本地视频文件
  - [x] 添加视频库
  - [x] 生成播放列表
- [x] 播放列表管理
  - [x] 播放列表杂质过滤
  - [ ] 创建合集
- [x] 采集网络资源
  - [x] 采集特定网站数据
  - [ ] 采集海报
  - [ ] 采集豆瓣信息
- [ ] aria2下载网络资源
