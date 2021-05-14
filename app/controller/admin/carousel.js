/*
 * @Author: rzx007
 * @Date: 2021-05-14 16:28:21
 * @LastEditors: rzx007
 * @LastEditTime: 2021-05-14 17:40:30
 * @FilePath: \init\app\controller\admin\carousel.js
 * @Description:轮播图逻辑
 */
'use strict';
const Controller = require('./baseController.js');

class CarouselController extends Controller {
  async index() {
    const { ctx } = this;
    const data = [];
    await ctx.render('admin/carousel/index', { list: data });
  }
  async add() {
    const { ctx } = this;
    const data = [];
    await ctx.render('admin/carousel/add', { list: data });
  }
  async edit() {
    const { ctx } = this;
    const data = [];
    await ctx.render('admin/carousel/edit', { list: data });
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
}

module.exports = CarouselController;
