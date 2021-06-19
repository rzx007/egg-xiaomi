/*
 * @Author: rzx007
 * @Date: 2021-06-20 00:53:13
 * @LastEditors: rzx007
 * @LastEditTime: 2021-06-20 00:53:31
 * @FilePath: \init\app\model\goods_attr.js
 * @Description: Do not edit
 */
'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const d = new Date();
  const GoodsAttrSchema = new Schema({
    goods_sn: { type: String },
    goods_id: { type: Schema.Types.ObjectId },
    cate_id: {
      type: Schema.Types.ObjectId,
    },
    attribute_id: {
      type: Schema.Types.ObjectId,
    },
    attribute_type: {
      type: String,
    },
    attribute_title: {
      type: String,
    },
    attribute_value: {

      type: String,
    },
    status: { type: Number, default: 1 },
    add_time: {
      type: Number,
      default: d.getTime(),
    },

  });

  return mongoose.model('GoodsAttr', GoodsAttrSchema, 'goods_attr');

};
