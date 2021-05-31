/*
 * @Author: rzx007
 * @Date: 2021-05-23 23:30:01
 * @LastEditors: rzx007
 * @LastEditTime: 2021-05-28 17:00:00
 * @FilePath: \init\app\model\goods_color.js
 * @Description: 商品颜色表
 */
'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const d = new Date();
  const ColorSchema = new Schema({
    color_name: { type: String },
    color_value: { type: String },
    status: { type: Number, default: 1 },
    add_time: {
      type: Number,
      default: d.getTime(),
    },

  });

  return mongoose.model('GoodsColor', ColorSchema, 'goods_color');
};
