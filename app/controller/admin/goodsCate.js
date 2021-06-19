/*
 * @Author: rzx007
 * @Date: 2021-05-23 23:35:36
 * @LastEditors: rzx007
 * @LastEditTime: 2021-06-20 00:46:52
 * @FilePath: \init\app\controller\admin\goodsCate.js
 * @Description: 商品分类，参考小米商城首页分类
 */
'use strict';

const Controller = require('./baseController.js');
class GoodsCateController extends Controller {
  async index() {
    const { ctx } = this;
    const data = await ctx.model.GoodsCate.aggregate([
      {
        $lookup: {
          from: 'goods_cate',
          localField: '_id',
          foreignField: 'pid',
          as: 'items',
        },
      },
      { $match: { pid: '0' } },
    ]);
    await this.ctx.render('admin/goodsCate/index', { list: data });
  }
  async add() {
    const { ctx } = this;
    const cateList = await ctx.model.GoodsCate.find({ pid: '0' });
    await ctx.render('admin/goodsCate/add', { cateList });
  }
  async edit() {
    const { ctx } = this;
    const { id } = ctx.query;
    const row = await ctx.model.GoodsCate.find({ _id: id });
    const cateList = await ctx.model.GoodsCate.find({ pid: '0' });
    await this.ctx.render('admin/goodsCate/edit', { list: row[0], cateList });
  }
  async addGoods() {
    const { ctx, app } = this;
    const row = ctx.request.body;
    const files = ctx.request.files;
    if (row.pid !== '0') { // 不是顶级模块，把关联的module_id转为ObjectId类型
      row.pid = app.mongoose.Types.ObjectId(row.pid);
    }
    // console.log(files);
    if (files.length > 0) {
      const pathArr = await ctx.helper.upload(app, files);
      row.cate_img = pathArr[0];
      await ctx.helper.jimpImg(pathArr[0]); // 生成略缩图
    }
    await ctx.model.GoodsCate.create(row);
    await this.success('/admin/goodsCate', '新增商品分类成功');
  }
  async updateGoods() {
    const { ctx, app } = this;
    const row = ctx.request.body;
    const files = ctx.request.files;
    if (files.length > 0) {
      const pathArr = await ctx.helper.upload(app, files);
      row.cate_img = pathArr[0];
      await ctx.helper.jimpImg(pathArr[0]);
    }
    if (row.pid !== '0') { // 不是顶级模块，把关联的module_id转为ObjectId类型
      row.pid = app.mongoose.Types.ObjectId(row.pid);
    }
    await ctx.model.GoodsCate.updateOne({ _id: row.id }, { $set: row }, (err, raw) => {
      console.log(raw);
    });
    await this.success('/admin/goodsCate', '修改商品分类成功');
  }
}

module.exports = GoodsCateController;
