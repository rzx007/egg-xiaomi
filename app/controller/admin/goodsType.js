/*
 * @Author: rzx007
 * @Date: 2021-05-18 11:42:19
 * @LastEditors: rzx007
 * @LastEditTime: 2021-05-23 14:11:23
 * @FilePath: \init\app\controller\admin\goodsType.js
 * @Description: 商品类型相关逻辑
 */
'use strict';

const Controller = require('./baseController.js');

class GoodsTypeController extends Controller {
  async index() {
    const { ctx } = this;
    const data = await ctx.model.GoodsType.find();
    await this.ctx.render('admin/goodsType/index', { list: data });
  }
  async add() {
    await this.ctx.render('admin/goodsType/add');
  }
  async edit() {
    const { ctx } = this;
    const { id } = ctx.query;
    const row = await ctx.model.GoodsType.find({ _id: id });
    await this.ctx.render('admin/goodsType/edit', { list: row[0] });
  }
  async addGoods() {
    const { ctx } = this;
    const { title, description } = ctx.request.body;
    await ctx.model.GoodsType.create({ title, description });
    await this.success('/admin/goodsType', '新增成功');
  }
  async updateGoods() {
    const { ctx } = this;
    const row = ctx.request.body;
    await ctx.model.GoodsType.findOneAndUpdate({ _id: row._id }, row);
    await this.success('/admin/goodsType', '修改成功');
  }
}

module.exports = GoodsTypeController;
