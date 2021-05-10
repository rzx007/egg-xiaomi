'use strict';

module.exports = {
  async success(redirectUrl, message) {

    // this.ctx.body='成功';

    await this.render('admin/common/success', {
      redirectUrl,
      message: message || '操作成功!',
    });

  },
  async error(redirectUrl, message) {

    // this.ctx.body='成功';

    await this.render('admin/common/error', {
      redirectUrl,
      message: message || '操作成功!',
    });

  },
};
