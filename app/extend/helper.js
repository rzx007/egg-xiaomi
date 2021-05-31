/*
 * @Author: rzx007
 * @Date: 2021-05-09 20:37:43
 * @LastEditors: rzx007
 * @LastEditTime: 2021-05-28 14:34:46
 * @FilePath: \init\app\extend\helper.js
 * @Description: 一些实用的 utility 函数
 */
// eslint-disable-next-line strict
const moment = require('moment');
const md5 = require('md5');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mz-modules/mkdirp');
const Jimp = require('jimp'); // 生成缩略图的模块
module.exports = {
  formatTime: time => moment(time).format('YYYY-MM-DD hh:mm:ss'), // 时间格式化
  uuid: function uuid() {
    // uuid格式：年月日时分秒3位毫秒+3位随机数，共20位  ===>   20190312162455043167
    let uuid = moment().format('YYYYMMDDHHmmssSSS');
    uuid += (Array(3).join(0) + Math.random() * 100).slice(-3);
    return uuid;
  },
  success: ({ ctx, data = null, msg = '请求成功' }) => {
    // 处理成功响应
    ctx.body = { code: 1, data, msg };
    ctx.status = 200;
  },
  error: ({ ctx, data = null, msg = '请求失败', status = 500 }) => {
    // 处理失败响应
    ctx.body = { code: 0, data, msg };
    ctx.status = status;
  },
  md5: str => md5(str), // MD5加密
  upload: async (app, files, temp) => { // 文件上传
    const day = moment().format('YYYYMMDD') + '\\';
    const basePath = app.config.baseDir + '\\app\\public';
    const tempPath = '\\' + (temp || 'file\\') + day;
    const filepathArr = [];
    await mkdirp(basePath + tempPath);
    for (const key in files) {
      const file = files[key];
      let newFilename = '';
      try {
        const reader = fs.createReadStream(file.filepath); // 创建可写流
        // 对文件重命名，以防名称冲突
        newFilename =
          tempPath +
          Math.random(10).toString(36) +
          new Date().getTime() +
          '.' +
          file.filename.split('.').pop();
        const newFilepath = `${basePath}${newFilename}`;
        // 把临时文件剪切到新目录取
        const upStream = fs.createWriteStream(newFilepath);
        reader.pipe(upStream);
      } finally {
        // 需要删除临时文件
        console.log('-----删除临时文件----');
        fs.unlink(file.filepath, function() {});
      }
      filepathArr.push(newFilename);
    }
    return filepathArr;
  },
  jimpImg: async target => { // 生成缩略图的公共方法
    // 上传图片成功以后生成缩略图 支持 bmp gif jpeg png tiff
    // console.log(path.join(__dirname, '..', '/public', target));
    const absolutePath = path.join(__dirname, '..', '/public', target);
    const extname = path.extname(target);
    console.log(absolutePath);
    Jimp.read(absolutePath, (err, lenna) => {
      if (err) throw err;
      lenna.resize(64, 64) // resize
        .quality(10) // set JPEG quality
        .write(absolutePath + '_64x64' + extname); // save
      lenna.resize(200, 200) // resize
        .quality(100) // set JPEG quality
        .write(absolutePath + '_200x200' + extname); // save

      lenna.resize(400, 400) // resize
        .quality(100) // set JPEG quality
        .write(absolutePath + '_400x400' + extname); // save
    });
  },
};
// https://www.jianshu.com/p/1484605c523a
