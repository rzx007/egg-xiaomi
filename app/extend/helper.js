// eslint-disable-next-line strict
const moment = require('moment');

// 时间格式化
exports.formatTime = time => moment(time).format('YYYY-MM-DD hh:mm:ss');
// uuid格式：年月日时分秒3位毫秒+3位随机数，共20位  ===>   20190312162455043167
exports.uuid = function uuid() {
  let uuid = moment().format('YYYYMMDDHHmmssSSS');
  uuid += (Array(3).join(0) + Math.random() * 100).slice(-3);
  return uuid;
};
// 处理成功响应
exports.success = ({ ctx, res = null, msg = '请求成功' }) => {
  ctx.body = {
    code: 1,
    data: res,
    msg,
  };
  ctx.status = 200;
};
// 处理失败响应
exports.fail = ({ ctx, res = null, msg = '请求失败' }) => {
  ctx.body = {
    code: 0,
    data: res,
    msg,
  };
  ctx.status = 500;
};
