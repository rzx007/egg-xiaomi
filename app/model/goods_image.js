/*
 * @Author: rzx007
 * @Date: 2021-06-20 00:51:44
 * @LastEditors: rzx007
 * @LastEditTime: 2021-06-20 00:52:35
 * @FilePath: \init\app\model\goods_image.js
 * @Description: Do not edit
 */
'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const d = new Date();
  const GoodsImageSchema = new Schema({
    goods_id: { type: Schema.Types.ObjectId },
    img_url: { type: String },
    color_id: {
      type: Schema.Types.Mixed, // 混合类型
    },
    status: { type: Number, default: 1 },
    add_time: {
      type: Number,
      default: d.getTime(),
    },
  });

  return mongoose.model('GoodsImage', GoodsImageSchema, 'goods_image');
};
