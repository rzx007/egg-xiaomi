'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router } = app;
  router.redirect('/', '/admin/home');

  // 后台
  require('./router/admin')(app);
};
