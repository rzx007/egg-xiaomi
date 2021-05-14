/*
 * @Author: rzx007
 * @Date: 2021-05-14 17:29:55
 * @LastEditors: rzx007
 * @LastEditTime: 2021-05-14 17:32:23
 * @FilePath: \init\app\model\carousel.js
 * @Description: 轮播图Schema
 */
'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const d = new Date();
  const CarouselSchema = new Schema({
    title: { type: String },
    type: { type: Number },
    carousel_img: { type: String },
    link: { type: String },
    sort: { type: Number },
    status: { type: Number, default: 1 },
    add_time: {
      type: Number,
      default: d.getTime(),
    },
  });

  return mongoose.model('Carousel', CarouselSchema, 'carousel');
};
