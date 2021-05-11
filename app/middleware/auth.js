'use strict';
const url = require('url');
const jwt = require('jsonwebtoken');
module.exports = () => {
  return async function auth(ctx, next) {
    /* const decode = jwt.verify(ctx.get('Authorization'), ctx.app.config.jwt.cert);
        ctx.userId = decode.id;*/
    if (ctx.session.userinfo) {
      ctx.state.userinfo = ctx.session.userinfo; // 全局变量
      const hasAuth = await ctx.service.admin.admin.checkAuth();
      if (hasAuth) {
        await next();
      } else {
        ctx.body = '您没有权限访问当前地址';
      }
    } else {
      // 排除不需要做权限判断的页面  /admin/verify?mt=0.7466881301614958
      const ignoreUrl = [ '/login', '/admin/getCaptcha', '/doLogin' ];
      const pathName = url.parse(ctx.request.url).pathname;
      if (ignoreUrl.includes(pathName)) {
        await next();
      } else {
        ctx.redirect('/login');
      }
    }
  };
};
