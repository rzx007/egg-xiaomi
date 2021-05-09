'use strict';
const jwt = require('jsonwebtoken');
module.exports = () => {
  return async function auth(ctx, next) {
    try {
      const ignoreUrl = [ '/login', '/admin/getCaptcha', '/doLogin' ];
      const pathName = ctx.request.url;
      if (ignoreUrl.includes(pathName)) {
        await next(); // 这里因为next之后的操作是异步的所以需要加 await
      } else {
        const decode = jwt.verify(ctx.get('Authorization'), ctx.app.config.jwt.cert);
        ctx.userId = decode.id;
        await next(); // 这里因为next之后的操作是异步的所以需要加 await
      }
    } catch (err) {
      console.log(err);
      ctx.redirect('/login');
      return;
    }
  };
};
