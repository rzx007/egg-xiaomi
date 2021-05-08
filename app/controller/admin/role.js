
'use strict';

const Controller = require('egg').Controller;

class RoleController extends Controller {
  async index() {
    const { ctx } = this;
    await ctx.render('admin/role/index', { data: '角色列表' });
  }
  async add() {
    const { ctx } = this;
    await ctx.render('admin/role/add', { data: '角色增加' });
  }
  async edit() {
    const { ctx } = this;
    await ctx.render('admin/role/edit', { data: '角色编辑' });
  }
  async delete() {
    const { ctx } = this;
    ctx.body = '角色删除';
  }
}

module.exports = RoleController;
