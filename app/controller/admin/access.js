
'use strict';

const Controller = require('./baseController.js');

class RoleController extends Controller {
  async index() {
    const { ctx } = this;
    await ctx.render('admin/access/index', { data: '权限列表' });
  }
  async add() {
    const { ctx } = this;
    await ctx.render('admin/access/add', { data: '权限增加' });
  }
  async edit() {
    const { ctx } = this;
    await ctx.render('admin/access/edit', { data: '权限编辑' });
  }
  async delete() {
    const { ctx } = this;
    ctx.body = '权限删除';
  }
}

module.exports = RoleController;
