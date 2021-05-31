/*
 * @Author: rzx007
 * @Date: 2021-05-23 14:07:23
 * @LastEditors: rzx007
 * @LastEditTime: 2021-05-29 18:55:41
 * @FilePath: \init\app\controller\admin\goodsTypeAttr.js
 * @Description: 商品类型属性相关逻辑
 */
'use strict';

const Controller = require('./baseController.js');

class GoodsTypeAttrController extends Controller {
  async index() {
    const { ctx, app } = this;
    const cate_id = ctx.query.id;
    const match = cate_id ? { cate_id: app.mongoose.Types.ObjectId(cate_id) } : {};
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
        $match: match,
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
    const { id, cateName } = ctx.query;
    const row = await ctx.model.GoodsTypeAttr.find({ _id: id });
    await this.ctx.render('admin/goodsTypeAttr/edit', { list: row[0], cateName });
  }
  async addGoods() {
    const { ctx } = this;
    const row = ctx.request.body;
    console.log(row);
    await ctx.model.GoodsTypeAttr.create(row);
    await this.success('/admin/goodsTypeAttr', '新增成功');
  }
  async updateGoods() {
    const { ctx } = this;
    const row = ctx.request.body;
    console.log(row);
    await ctx.model.GoodsTypeAttr.findOneAndUpdate({ _id: row._id }, row);
    await this.success('/admin/goodsTypeAttr?id=' + row.cate_id, '修改商品类型属性成功');
  }
  async getGoodsTypeAttrByTypeId() { // 通过商品类型查询商品类型的属性 api接口
    const { ctx, app } = this;
    const cate_id = ctx.query.id;
    const match = cate_id ? { cate_id: app.mongoose.Types.ObjectId(cate_id) } : {};
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
        $match: match,
      },
    ]);
    ctx.helper.success({ ctx, data });
  }
}

module.exports = GoodsTypeAttrController;
