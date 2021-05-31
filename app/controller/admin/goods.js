/*
 * @Author: rzx007
 * @Date: 2021-05-28 15:35:50
 * @LastEditors: rzx007
 * @LastEditTime: 2021-05-28 17:52:53
 * @FilePath: \init\app\controller\admin\goods.js
 * @Description: 商品
 */
'use strict';

const Controller = require('./baseController.js');

class GoodsController extends Controller {
  async index() {
    const { ctx } = this;
    const data = await ctx.model.Goods.aggregate([
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
    await this.ctx.render('admin/goods/index', { list: data });
  }
  async add() {
    const { ctx } = this;
    const colorList = await ctx.model.GoodsColor.find();
    const typeList = await ctx.model.GoodsType.find();
    await ctx.render('admin/goods/add', { colorList, typeList });
  }
  async edit() {
    const { ctx } = this;
    const { id } = ctx.query;
    const row = await ctx.model.Goods.find({ _id: id });
    const cateList = await ctx.model.Goods.find({ pid: '0' });
    await this.ctx.render('admin/Goods/edit', { list: row[0], cateList });
  }
  async addGoods() {
    const { ctx, app } = this;
    console.log(ctx.request.body);
  }
  async updateGoods() {
    const { ctx, app } = this;
  }
}

module.exports = GoodsController;
