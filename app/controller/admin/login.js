/*
 * @Author: rzx007
 * @Date: 2021-05-07 23:36:17
 * @LastEditors: rzx007
 * @LastEditTime: 2021-05-16 16:12:23
 * @FilePath: \init\app\controller\admin\login.js
 * @Description: 登录登出逻辑
 */
'use strict';

const Controller = require('./baseController.js');
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
    const { username, password, code } = ctx.request.body;
    // console.log(ctx.helper.md5(password));
    // 验证码验证
    const isCaptchaVail = ctx.service.tools.checkCaptcha(code);
    if (isCaptchaVail) {
      const userData = await ctx.service.admin.login.doLogin(username, ctx.helper.md5(password));
      console.log(username, ctx.helper.md5(password));
      if (userData.length > 0) {
        ctx.session.userinfo = userData[0]; // 设置 Session
        ctx.rotateCsrfSecret(); // 调用 rotateCsrfSecret 刷新用户的 CSRF token
        ctx.redirect('/admin/home');
        /*
        const data = {
          username: userData.username,
          avatar_url: userData.avatar_url,
        };
        ctx.helper.success({ ctx, data });*/
      } else {
        // ctx.helper.error({ ctx, msg: '用户名或密码错误' });
        await this.error('/login', '用户名或密码错误');
      }
    } else {
      // ctx.helper.error({ ctx, msg: '验证码错误' });
      await this.error('/login', '验证码错误');
    }
  }
  async loginOut() {
    this.ctx.session.userinfo = null;
    this.ctx.redirect('/login');
  }
}

module.exports = LoginController;
