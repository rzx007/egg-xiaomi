/*
 * @Author: rzx007
 * @Date: 2021-05-11 10:57:38
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2021-05-11 11:00:40
 */

'use strict';

const Controller = require('./baseController.js');

class ManagerController extends Controller {
  async index() {
    const { ctx } = this;
    const data = await ctx.model.Admin.aggregate([
      {
        // 关联表查询，通过用户表的role_id与角色表的_id对应起来，用role输出
        $lookup: {
          from: 'role',
          localField: 'role_id',
          foreignField: '_id',
          as: 'role',
        },
      },
    ]);
    await ctx.render('admin/manager/index', { list: data });
    // const res = await ctx.service.admin.admin.getMenu();
    // ctx.body = {
    //   data: res,
    // };
  }
  async add() {
    const { ctx } = this;
    const roleResult = await ctx.model.Role.find(); // 查出所有角色列表
    await ctx.render('admin/manager/add', { roleResult });
  }
  async addUser() {
    const { ctx } = this;
    const formData = ctx.request.body;
    formData.password = ctx.helper.md5(formData.password);
    const adminResult = await ctx.model.Admin.find({
      username: formData.username,
    });
    if (adminResult.length > 0) {
      await this.error('/admin/manager/add', '此管理员已经存在');
    } else {
      await ctx.model.Admin.create(formData);
      await this.success('/admin/manager', '增加用户成功');
    }
  }
  async edit() {
    const { ctx } = this;
    const id = ctx.query.id;
    const adminResult = await ctx.model.Admin.find({ _id: id });
    const roleResult = await ctx.model.Role.find(); // 查出所有角色列表
    await ctx.render('admin/manager/edit', {
      adminResult: adminResult[0],
      roleResult,
    });
  }
  async updateUser() {
    const { ctx } = this;
    const formData = ctx.request.body;
    if (formData.password) {
      formData.password = ctx.helper.md5(formData.password);
    }
    const adminResult = await ctx.model.Admin.updateOne({ _id: formData.id }, formData);
    if (adminResult.ok) {
      await this.success('/admin/manager', '修改用户信息成功');
    } else {
      await this.error('/admin/manager', '修改用户信息成失败');
    }
  }
  async upload() {
    const { ctx, app } = this;
    const files = ctx.request.files;
    let pathArr = [];
    try {
      // 处理文件，比如上传到云端
      pathArr = await ctx.helper.upload(app, files);
    } finally {
      // 需要删除临时文件
    }

    ctx.body = {
      url: pathArr,
      // 获取所有的字段值
      requestBody: ctx.request.body,
    };
  }
}

module.exports = ManagerController;
