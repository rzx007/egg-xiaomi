/*
 * @Author: rzx007
 * @Date: 2021-05-23 23:35:36
 * @LastEditors: rzx007
 * @LastEditTime: 2021-05-24 00:04:48
 * @FilePath: \init\app\controller\admin\goodsCate.js
 * @Description: 商品分类，参考小米商城首页分类
 */
'use strict';

const Controller = require('./baseController.js');

class GoodsCateController extends Controller {
  async index() {
    const { ctx } = this;
    const data = await ctx.model.GoodsCate.find();
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
    await this.ctx.render('admin/goodsCate/edit', { list: row[0] });
  }
  async addGoods() {
    const { ctx, app } = this;
    const row = ctx.request.body;
    const files = ctx.request.files;
    console.log(files);
    if (files.length > 0) {
      const pathArr = await ctx.helper.upload(app, files);
      row.cate_img = pathArr[0];
    }
    await ctx.model.GoodsCate.create(row);
    await this.success('/admin/goodsCate', '新增成功');
  }
  async updateGoods() {
    const { ctx } = this;
    const row = ctx.request.body;
    await ctx.model.GoodsCate.findOneAndUpdate({ _id: row._id }, row);
    await this.success('/admin/goodsCate', '修改成功');
  }
}

module.exports = GoodsCateController;
