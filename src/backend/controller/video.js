// video controller
const fs = require('fs')

module.exports = {
  getURL (req, res, next){
    /**
     * 获取视频播放地址
     */
    let videoPath = req.query.video
    if(fs.existsSync(videoPath)){
      let stat = fs.statSync(videoPath)
      let fileSize = stat.size
      let range = req.headers.range
      if(range){
        let parts = range.replace(/bytes=/, '').split('-')
        let start = parseInt(parts[0], 10)
        let end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1
        end = end > fileSize - 1 ? fileSize - 1 : end
        // let end = parseInt(parts[1], 10)
        // end = end > fileSize - 1 ? fileSize - 1 : end
        let chunksize = (end - start) + 1
        let file = fs.createReadStream(videoPath, {
          start,
          end
        })
        let head = {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': 'video/mp4',
        }
        res.writeHead(206, head)
        file.pipe(res)
      } else {
        let head = {
          'Content-Length': fileSize,
          'Content-Type': 'video/mp4',
        }
        res.writeHead(200, head)
        fs.createReadStream(videoPath).pipe(res)
      }
    } else {
      res.json({status: 4004, message: '文件不存在！'})
    }
  }
}