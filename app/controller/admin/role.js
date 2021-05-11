
'use strict';

const Controller = require('./baseController.js');

class RoleController extends Controller {
  async index() {
    const { ctx } = this;
    const data = await ctx.model.Role.find();
    await ctx.render('admin/role/index', { list: data });
  }
  async add() {
    const { ctx } = this;
    await ctx.render('admin/role/add', { data: '角色增加' });
  }
  async edit() {
    const { ctx } = this;
    const id = ctx.query.id;
    const data = await ctx.model.Role.find({ _id: id });
    await ctx.render('admin/role/edit', { list: data[0] });
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
  async auth() {
    const { ctx } = this;
    const id = ctx.query.id;
    // 查询所有权限，并分组
    const rows = await ctx.model.Access.aggregate([
      { $match: { module_id: '0' } },
      {
        $lookup: {
          from: 'access',
          localField: '_id',
          foreignField: 'module_id',
          as: 'items',
        },
      },
    ]);
    // 查询当前角色拥有的权限（查询当前角色的权限id） 把查找到的数据放在数组中
    const accessReulst = await ctx.model.RoleAccess.find({ role_id: id }, { access_id: true });
    const roleAccessArray = [];
    accessReulst.forEach(value => {
      roleAccessArray.push(value.access_id.toString());
    });
    // 默认选中
    rows.forEach(item => {
      if (roleAccessArray.indexOf(item._id.toString()) > -1) {
        item.checked = true;
        if (item.items) {
          item.items.forEach(ele => {
            if (roleAccessArray.indexOf(ele._id.toString()) > -1) {
              ele.checked = true;
            }
          });
        }
      }
    });
    await ctx.render('admin/role/auth', { list: rows, role_id: id });
  }
  async addAuth() {
    const { ctx } = this;
    const id = ctx.request.body.role_id;
    const access_node = ctx.request.body.access_node;
    // 1、删除当前角色下面的所有权限
    await ctx.model.RoleAccess.deleteMany({ role_id: id });
    // 2、给role_access增加数据 把获取的权限和角色增加到数据库
    for (let i = 0; i < access_node.length; i++) {
      const roleAccessData = new this.ctx.model.RoleAccess({
        role_id: id,
        access_id: access_node[i],
      });
      roleAccessData.save();
    }
    await this.success('/admin/role/auth?id=' + id, '授权成功');
  }
}

module.exports = RoleController;
