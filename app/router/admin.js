'use strict';
module.exports = app => {
  const { router, controller } = app;

  // 后台
  router.get('/login', controller.admin.login.index);

  router.get('/admin/manager', controller.admin.manager.index);
  router.get('/admin/manager/add', controller.admin.manager.add);
  router.get('/admin/manager/edit', controller.admin.manager.edit);

  router.get('/admin/role', controller.admin.role.index);
  router.get('/admin/role/add', controller.admin.role.add);
  router.get('/admin/role/edit', controller.admin.role.edit);
  router.get('/admin/role/delete', controller.admin.role.delete);

  router.get('/admin/access', controller.admin.access.index);
  router.get('/admin/access/add', controller.admin.access.add);
  router.get('/admin/access/edit', controller.admin.access.edit);
  router.get('/admin/access/delete', controller.admin.access.delete);
};
