/*
 * @Author: rzx007
 * @Date: 2021-05-28 15:35:50
 * @LastEditors: rzx007
 * @LastEditTime: 2021-06-21 00:14:19
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
    const colorList = await ctx.model.GoodsColor.find(); // 商品颜色列表
    const typeList = await ctx.model.GoodsType.find(); // 商品类型列表（goods_type）
    const goodsCate = await ctx.model.GoodsCate.aggregate([
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
    await ctx.render('admin/goods/add', { colorList, typeList, goodsCate });
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
    const files = await ctx.helper.uploadStream(app, ctx);
    console.log(files);
  }
  async updateGoods() {
    const { ctx, app } = this;
  }
  async uploadImg() { // 富文本编辑器文件上传
    const { ctx, app } = this;
    const { filepathArr } = await ctx.helper.uploadStream(app, ctx);
    ctx.body = { link: filepathArr[0] }; // wysiwyg插件文件上传返回的特殊格式
  }
  async goodsUploadPhoto() { // 多文件上传,商品相册图片
    const { ctx, app } = this;
    const { filepathArr } = await ctx.helper.uploadStream(app, ctx);
    for (let index = 0; index < filepathArr.length; index++) {
      const element = filepathArr[index];
      await ctx.helper.jimpImg(element); // 生成略缩图
    }
    ctx.helper.success({ ctx, data: filepathArr });
  }
}

module.exports = GoodsController;
