// 父类

'use strict';


const Controller = require('egg').Controller;

class BaseController extends Controller {
  async success(redirectUrl, message) {

    // this.ctx.body='成功';

    await this.ctx.render('admin/common/success', {
      redirectUrl,
      message: message || '操作成功!',
    });


  }

  async error(redirectUrl, message) {

    // this.ctx.body='成功';

    await this.ctx.render('admin/common/error', {
      redirectUrl,
      message: message || '操作成功!',
    });

  }

  // 封装一个删除方法
  async delete() {

    /*
      1、获取要删除的数据库表   model

      2、获取要删除数据的id   _id

      3、执行删除

      4、返回到以前的页面           ctx.request.headers['referer']   (上一页的地址)
      */
    const prevPage = this.ctx.request.headers.referer;
    const model = this.ctx.request.query.model; // Role

    const id = this.ctx.request.query.id;

    await this.ctx.model[model].deleteOne({ _id: id }); // 注意写法

    this.ctx.redirect(prevPage);

  }


}

module.exports = BaseController;
