/*
 * @Author: rzx007
 * @Date: 2021-05-09 21:33:55
 * @LastEditors: rzx007
 * @LastEditTime: 2021-05-12 18:52:47
 * @FilePath: \init\app\middleware\auth.js
 * @Description:中间件,1.判断是否登录，2.判断是否访问权限
 */
'use strict';
const url = require('url');
const jwt = require('jsonwebtoken');
module.exports = () => {
  return async function auth(ctx, next) {
    /* const decode = jwt.verify(ctx.get('Authorization'), ctx.app.config.jwt.cert);
        ctx.userId = decode.id;*/
    // ctx.session.userinfo = null;
    if (ctx.session.userinfo) {
      // console.log(ctx.session.userinfo);
      ctx.state.userinfo = ctx.session.userinfo; // 全局变量
      const hasAuth = await ctx.service.admin.admin.checkAuth();
      if (hasAuth) {
        ctx.state.asideList = await ctx.service.admin.admin.getMenu(ctx.session.userinfo.role_id);
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
