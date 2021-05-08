
'use strict';

const Controller = require('egg').Controller;

class ManagerController extends Controller {
  async index() {
    const { ctx } = this;
    await ctx.render('admin/manager/index', { data: '管理员列表' });
  }
  async add() {
    const { ctx } = this;
    await ctx.render('admin/manager/add', { data: '管理员增加' });
  }
  async edit() {
    const { ctx } = this;
    await ctx.render('admin/manager/edit', { data: '管理员编辑' });
  }
}

module.exports = ManagerController;
