
'use strict';

const Controller = require('./baseController.js');

class RoleController extends Controller {
  async index() {
    const { ctx } = this;
    const data = await ctx.model.Role.find();
    await ctx.render('admin/role/index', { data });
  }
  async add() {
    const { ctx } = this;
    await ctx.render('admin/role/add', { data: '角色增加' });
  }
  async edit() {
    const { ctx } = this;
    const id = ctx.query.id;
    const data = await ctx.model.Role.find({ _id: id });
    await ctx.render('admin/role/edit', { data: data[0] });
  }
  async addRole() {
    const { ctx } = this;
    // console.log(ctx.request.body);
    const row = ctx.request.body;
    await ctx.service.admin.role.roleAdd(row);
    await this.success('/admin/role', '新增角色成功');
  }
  async updateRole() {
    const { ctx } = this;
    const row = ctx.request.body;
    await ctx.model.Role.findOneAndUpdate({ _id: row._id }, row);
    await this.success('/admin/role', '新增角成功');
  }
  async delete() {
    const { ctx } = this;
    ctx.body = '角色删除';
  }
}

module.exports = RoleController;
