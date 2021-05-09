'use strict';

const { Controller } = require('egg');

class LoginController extends Controller {
  async index() {
    const { ctx } = this;
    await ctx.render('admin/login.html', { data: '登录' });
  }
  // 生成验证码
  async getCaptcha() {
    const { ctx } = this;
    const captcha = await ctx.service.tools.getCaptcha();
    // 把生成的验证码文本信息（如：t8ec），存入session，以待验证
    ctx.session.code = captcha.text;
    // 返回前端
    ctx.response.type = 'image/svg+xml';
    ctx.body = captcha.data;
  }
  async doLogin() {
    const { ctx } = this;
    console.log(ctx.request.body);
    // 结构，username, password, code客户端传过来得值.
    // 坑：将post过来的数据Json序列化，取时又转为对象
    ctx.body = ` ${JSON.stringify(ctx.request.body)}`;
    const { username, password, code } = JSON.parse(ctx.body);
    const resMsg = {
      errcode: 1,
      data: {},
      msg: '登录成功',
    };
    // 验证码验证
    const isCaptchaVail = ctx.service.tools.checkCaptcha(code);
    if (!isCaptchaVail) {
      resMsg.errcode = 0;
      resMsg.msg = '验证码错误!';
      ctx.body = resMsg;
      return;
    }
    // 验证码通过
    const userData = await ctx.service.admin.login.doLogin(username, password);
    if (!userData) {
      resMsg.errcode = 0;
      resMsg.msg = '用户名或密码错误';
      ctx.body = resMsg;
      return;
    }
    // 设置 Session
    ctx.session.user = { username: userData.username };
    // 调用 rotateCsrfSecret 刷新用户的 CSRF token
    ctx.rotateCsrfSecret();
    resMsg.data.token = userData.token;
    resMsg.data.username = userData.username;
    resMsg.data.avatar_url = userData.avatar_url;
    ctx.body = resMsg;
  }
}

module.exports = LoginController;
