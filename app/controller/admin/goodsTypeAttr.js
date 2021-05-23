/*
 * @Author: rzx007
 * @Date: 2021-05-23 14:07:23
 * @LastEditors: rzx007
 * @LastEditTime: 2021-05-23 14:38:12
 * @FilePath: \init\app\controller\admin\goodsTypeAttr.js
 * @Description: 商品类型属性相关逻辑
 */
'use strict';

const Controller = require('./baseController.js');

class HomeController extends Controller {
  async index() {
    const { ctx, app } = this;
    const cate_id = ctx.query.id;
    const data = await ctx.model.GoodsTypeAttr.aggregate([
      {
        $lookup: {
          from: 'goods_type',
          localField: 'cate_id',
          foreignField: '_id',
          as: 'goods_type',
        },
      },
      {
        $match: {
          cate_id: app.mongoose.Types.ObjectId(cate_id), // 注意id转为ObjectId
        },
      },
    ]);
    await this.ctx.render('admin/goodsTypeAttr/index', { list: data, cate_id });
  }
  async add() {
    const { ctx } = this;
    const cate_id = ctx.query.id;
    const goodsTypes = await ctx.model.GoodsType.find();
    await this.ctx.render('admin/goodsTypeAttr/add', { goodsTypes, cate_id });
  }
  async edit() {
    const { ctx } = this;
    const { id } = ctx.query;
    const row = await ctx.model.GoodsTypeAttr.find({ _id: id });
    await this.ctx.render('admin/goodsTypeAttr/edit', { list: row[0] });
  }
  async addGoods() {
    const { ctx } = this;
    const row = ctx.request.body;
    await ctx.model.GoodsTypeAttr.create(row);
    await this.success('/admin/goodsTypeAttr', '新增成功');
  }
  async updateGoods() {
    const { ctx } = this;
    const row = ctx.request.body;
    await ctx.model.GoodsTypeAttr.findOneAndUpdate({ _id: row._id }, row);
    await this.success('/admin/goodsTypeAttr', '修改成功');
  }
}

module.exports = HomeController;
