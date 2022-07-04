/*
 * @Author: 阮志雄
 * @Date: 2021-07-06 15:31:53
 * @LastEditTime: 2021-08-04 17:56:51
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \egg-xiaomi\app\controller\admin\access.js
 */

'use strict';

const Controller = require('./baseController.js');

class RoleController extends Controller {
  async index() {
    const { ctx } = this;
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
    await ctx.render('admin/access/index', { list: rows });
  }

  async add() {
    const { ctx } = this;
    const rows = await ctx.model.Access.find({ module_id: '0' });
    await ctx.render('admin/access/add', { moduleList: rows });
  }

  async addAccess() {
    const { ctx, app } = this;
    const fromData = ctx.request.body;
    if (fromData.module_id !== '0') { // 不是顶级模块，把关联的module_id转为ObjectId类型
      fromData.module_id = app.mongoose.Types.ObjectId(fromData.module_id);
    }
    const access = await ctx.model.Access.create(fromData);
    if (access) {
      await this.success('/admin/access', '新增权限成功');
    }
  }

  async edit() {
    const { ctx } = this;
    const id = ctx.query.id;
    const rows = await ctx.model.Access.find({ module_id: '0' });
    const accessResult = await ctx.model.Access.find({ _id: id });
    await ctx.render('admin/access/edit', { moduleList: rows, list: accessResult[0] });
  }

  async updateAccess() {
    const { ctx, app } = this;
    const fromData = ctx.request.body;
    if (fromData.module_id !== '0') { // 不是顶级模块，把关联的module_id转为ObjectId类型
      fromData.module_id = app.mongoose.Types.ObjectId(fromData.module_id);
    }
    await ctx.model.Access.findOneAndUpdate({ _id: fromData.id }, fromData);
    await this.success('/admin/access', '修改权限成功');
  }

  async delete() {
    const { ctx } = this;
    ctx.body = '权限删除';
  }
}

module.exports = RoleController;

// https://www.jianshu.com/p/eaf51d9e3630
// https://www.cnblogs.com/fengting0913/p/14616629.html
