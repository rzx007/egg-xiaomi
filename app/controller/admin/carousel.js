/*
 * @Author: rzx007
 * @Date: 2021-05-14 16:28:21
 * @LastEditors: rzx007
 * @LastEditTime: 2021-05-15 00:22:15
 * @FilePath: \init\app\controller\admin\carousel.js
 * @Description:轮播图逻辑
 */
'use strict';
const Controller = require('./baseController.js');

class CarouselController extends Controller {
  async index() {
    const { ctx } = this;
    const data = await ctx.model.Carousel.find({});
    await ctx.render('admin/carousel/index', { list: data });
  }
  async add() {
    const { ctx } = this;
    const data = [];
    await ctx.render('admin/carousel/add', { list: data });
  }
  async edit() {
    const { ctx } = this;
    const id = ctx.query.id;
    const data = await ctx.model.Carousel.find({ _id: id });
    console.log(data);
    await ctx.render('admin/carousel/edit', { list: data[0] });
  }
  async addCarousel() {
    const { ctx, app } = this;
    console.log(ctx.request.body);
    const data = ctx.request.body;
    const files = ctx.request.files;
    console.log(ctx.request.files);
    if (files.length > 0) {
      const pathArr = await ctx.helper.upload(app, files);
      await ctx.model.Carousel.create({ carousel_img: pathArr[0], ...data });
      await this.success('/admin/carousel', '新增成功');
    }
  }
  async updateCarousel() {
    const { ctx, app } = this;
    let params = ctx.request.body;
    const files = ctx.request.files;
    if (files.length > 0) {
      const pathArr = await ctx.helper.upload(app, files);
      params = Object.assign({}, params, { carousel_img: pathArr[0] });
    }
    await ctx.model.Carousel.updateOne({ _id: params.id }, params);

    await this.success('/admin/carousel', '修改轮播图成功');
  }
}

module.exports = CarouselController;
