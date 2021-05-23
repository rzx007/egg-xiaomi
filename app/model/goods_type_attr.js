/*
 * @Author: rzx007
 * @Date: 2021-05-23 14:03:00
 * @LastEditors: rzx007
 * @LastEditTime: 2021-05-23 14:06:48
 * @FilePath: \init\app\model\goods_type_attribute.js
 * @Description: 商品类型的属性列表，例如手机的操作系统，是否支持蓝牙，是否5G，处理器型号等等
 */
'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const d = new Date();

  const GoodsTypeAttributeSchema = new Schema({
    cate_id: { type: Schema.Types.ObjectId }, // 所对应的商品类型ID
    title: { type: String },
    attr_type: { type: String }, // 类型  1 input    2  textarea    3、select
    attr_value: { type: String }, // 默认值： input  textarea默认值是空     select框有默认值  多个默认值以回车隔开
    status: { type: Number, default: 1 },
    add_time: {
      type: Number,
      default: d.getTime(),
    },
  });
  return mongoose.model('GoodsTypeAttr', GoodsTypeAttributeSchema, 'goods_type_attribute');
};
