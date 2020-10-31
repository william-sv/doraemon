// 读取文件夹内文件 controller
const fs = require('fs')
const path = require('path')

// exports.index = async (req, res) => {
//     let dirPath = req.query.path
//     if(dirPath === undefined){
//         res.json({status: 200, msg: '缺少必要参数', files: []})
//     }
//     if(!fs.existsSync(dirPath)){
//         res.json({status: 200, msg: '该文件夹不存在', files: []})
//     }
//     const dirFiles = []
//     await readFileFromFolder(dirPath, dirFiles)
//     res.json({status: 200, msg: '',files: dirFiles})
// }

module.exports = {
  async index (req, res, next){
    let dirPath = req.query.path
    if(dirPath === undefined){
      res.json({status: 200, msg: '缺少必要参数', files: []})
    }
    if(!fs.existsSync(dirPath)){
      res.json({status: 200, msg: '该文件夹不存在', files: []})
    }
    const dirFiles = []
    await readFileFromFolder(dirPath, dirFiles)
    res.json({status: 200, msg: '',files: dirFiles})
  }
}

// 读取文件
async function readFileFromFolder(dirPath, dirFiles){
  const usefulFiles = ['mp4','webm','ogg','mkv','avi','mov','asf','wmv','navi','3gp','flv','f4v','rmvb','hddvd','rm','rmvb']
  const files = fs.readdirSync(dirPath)
  files.forEach(function(item,index){
    const stat = fs.statSync(path.join(dirPath, item))
    if(stat.isDirectory()){
      const newDirPath = path.join(dirPath,item)
      readFileFromFolder(newDirPath, dirFiles)
    } else {
      const SplitItem = item.split('.')
      const fileFormat = SplitItem[SplitItem.length - 1].toLowerCase()
      if (usefulFiles.indexOf(fileFormat) !== -1) {
        let fileSize = 0
        const fileSizeLength = stat.size.toString().length
        if(fileSizeLength <= 8){
          fileSize = Math.round((stat.size / 1024) * 100 ) / 100 + 'KB'
        } else if (fileSizeLength <= 9 && fileSizeLength > 8){
          fileSize = Math.round((stat.size / 1024 / 1024) * 100 ) / 100 + 'MB'
        } else if(fileSizeLength > 9){
          fileSize = Math.round((stat.size / 1024 / 1024 / 1024) * 100 ) / 100 + 'GB'
        }
        dirFiles.push({
          name: item,
          absolutePath: path.join(dirPath,item),
          dirPath: dirPath,
          fileFormat: fileFormat,
          fileSize: fileSize
        })
      }
    }
  })
}