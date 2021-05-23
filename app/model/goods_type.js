/*
 * @Author: rzx007
 * @Date: 2021-05-18 11:22:55
 * @LastEditors: rzx007
 * @LastEditTime: 2021-05-18 13:34:40
 * @FilePath: \init\app\model\good_types.js
 * @Description: 商品类型，如手机,笔记本,电视，出行，耳机等等
 */
'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const d = new Date();
  const GoodsTypeSchema = new Schema({
    title: { type: String },
    description: { type: String },
    status: { type: Number, default: 1 },
    add_time: {
      type: Number,
      default: d.getTime(),
    },
  });

  return mongoose.model('GoodsType', GoodsTypeSchema, 'goods_type');
};
