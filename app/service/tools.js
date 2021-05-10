'use strict';

const { Service } = require('egg');
const svgCaptcha = require('svg-captcha');

class ToolService extends Service {
  // 验证码生成
  async getCaptcha() {
    const code = await svgCaptcha.create({
      size: 2,
      fontSize: 50,
      width: 100,
      height: 40,
      background: '#cc9966',
    });
    return code;
  }
  // 检验客户端传过来得验证码
  checkCaptcha(code) {
    const { ctx } = this;
    code = code.toLowerCase();
    // get code from session
    const sessionCode = ctx.session.code ? ctx.session.code.toLowerCase() : null;
    if (code === sessionCode) {
      // 销毁code
      ctx.session.code = null;
    }
    return code === sessionCode;
  }
}

module.exports = ToolService;
