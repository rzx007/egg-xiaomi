/*
 * @Author: rzx007
 * @Date: 2021-05-23 23:30:01
 * @LastEditors: rzx007
 * @LastEditTime: 2021-05-23 23:34:50
 * @FilePath: \init\app\model\goods_cate.js
 * @Description: 商品分类,自关联
 */
/*

id    name              pid
1      手机               0
2      电脑               0
3      服装               0
4      小米1              1
5      小米2              1
6      小米笔记本         2
7      小米T恤            3
*/
'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const d = new Date();
  const GoodsCateSchema = new Schema({
    title: { type: String },
    cate_img: { type: String },
    filter_attr: { // 筛选id
      type: String,
    },
    link: {
      type: String,
    },
    template: { /* 指定当前分类的模板*/
      type: String,
    },
    pid: {
      type: Schema.Types.Mixed, // 混合类型
    },
    sub_title: { type: String }, /* seo相关的标题  关键词  描述*/
    keywords: { type: String },
    description: { type: String },
    status: { type: Number, default: 1 },
    add_time: {
      type: Number,
      default: d.getTime(),
    },

  });

  return mongoose.model('GoodsCate', GoodsCateSchema, 'goods_cate');
};
