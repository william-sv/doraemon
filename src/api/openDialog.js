import { ipcRenderer } from 'electron'
const fs = require('fs')
const path  = require('path')

class OpenDialog{
  constructor(){
    if(OpenDialog.instance){
      return OpenDialog.instance
    }
    this.onOpenFile()
    this.onOpenFolder()
    OpenDialog.instance = this
  }
  onOpenFile(){
    ipcRenderer.send('openFile')
  }
  onOpenFolder(){
    ipcRenderer.send('openFolder')
  }
  onOpenFile(){
    ipcRenderer.on('openFile-ok', (e, path) => {
      if (!path){
        return
      }
      const arr = this.getFilesStatFromLocal(path)
      if (arr.length == 0) {
        return
      }
    })
  }

  onOpenFolder(){
    ipcRenderer.on('openFolder-ok', (e, path) => {
      if(!path){
        return
      }
      const arr = this.getFilesStatFromLocal(path)
      if (arr.length == 0) {
        return
      }
    })
  }

  //获取本地文件信息
  getFilesStatFromLocal(path){
    let arr = []
    for (let i = 0; i< path.length; i++ ){
      const result = fs.statSync(path[i])
      if(result && result.dev){
        let obj = Object.assign({}, result, {
          src: path[i],
          mode: 'local'
        })
        arr.push(this.formatData(obj))
      }
    }
  }

  formatData(data){
    let result = true
    if(data.mode == 'local'){
      result = fs.existsSync(data.src)
    }
    return {
      id: data.src,
      // 创建时间
      createTime: +new Date(data.birthtime),
      // 视频大小
      size: data.size,
      mode: data.mode,
      src: data.src,
      filename: path.basename(data.src),
      //文件是否有效
      msg: result ? '' : '无效文件'
    }
  }
}