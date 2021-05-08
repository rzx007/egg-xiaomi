'use strict';

const { Controller } = require('egg');

class LoginController extends Controller {
  async index() {
    const { ctx } = this;
    await ctx.render('admin/login.html', { data: '登录' });
  }
}

module.exports = LoginController;
