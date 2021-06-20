/*
 * @Author: rzx007
 * @Date: 2021-05-14 16:28:21
 * @LastEditors: rzx007
 * @LastEditTime: 2021-06-21 00:49:13
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
    // console.log(data);
    await ctx.render('admin/carousel/edit', { list: data[0] });
  }
  async addCarousel() {
    const { ctx, app } = this;
    const { filepathArr, body } = await ctx.helper.uploadStream(app, ctx);
    if (filepathArr.length > 0) {
      await ctx.helper.jimpImg(filepathArr[0]);
      await ctx.model.Carousel.create({ carousel_img: filepathArr[0], ...body });
      await this.success('/admin/carousel', '新增成功');
    } else {
      await this.error('/admin/carousel', '请添加轮播图片');
    }

  }
  async updateCarousel() {
    const { ctx, app } = this;
    let { filepathArr, body } = await ctx.helper.uploadStream(app, ctx);
    if (filepathArr.length > 0) {
      body = Object.assign({}, body, { carousel_img: filepathArr[0] });
    }
    console.log(body);
    await ctx.model.Carousel.updateOne({ _id: body.id }, body);
    await this.success('/admin/carousel', '修改轮播图成功');
  }
}

module.exports = CarouselController;
