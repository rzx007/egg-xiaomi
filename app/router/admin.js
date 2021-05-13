/*
 * @Author: rzx007
 * @Date: 2021-05-08 12:39:10
 * @LastEditors: rzx007
 * @LastEditTime: 2021-05-13 14:40:48
 * @FilePath: \init\app\router\admin.js
 * @Description: 后台路由接口
 */

'use strict';
module.exports = app => {
  const { router, controller } = app;
  // 后台
  router.get('/login', controller.admin.login.index);
  router.get('/admin/getCaptcha', controller.admin.login.getCaptcha); // 获取验证码
  router.post('/doLogin', controller.admin.login.doLogin);
  router.get('/loginOut', controller.admin.login.loginOut);
  router.get('/admin/delete', controller.admin.baseController.delete); // 公共删除接口,传入model名称和_id
  router.get('/admin/common/changeStatus', controller.admin.baseController.changeStatus);

  // 用户增删改
  router.get('/admin/manager', controller.admin.manager.index);
  router.get('/admin/manager/add', controller.admin.manager.add); // 用户新增页面
  router.post('/admin/manager/addUser', controller.admin.manager.addUser); // 新增用户保存接口
  router.get('/admin/manager/edit', controller.admin.manager.edit); // 编辑用户页面
  router.post('/admin/manager/updateUser', controller.admin.manager.updateUser); // 编辑提交保存接口

  // 角色增删改
  router.get('/admin/role', controller.admin.role.index);
  router.get('/admin/role/add', controller.admin.role.add);
  router.get('/admin/role/edit', controller.admin.role.edit);
  router.get('/admin/role/auth', controller.admin.role.auth); // 角色授权页面，一个角色对应多个功能菜单
  router.post('/admin/role/addRole', controller.admin.role.addRole);
  router.post('/admin/role/updateRole', controller.admin.role.updateRole);
  router.post('/admin/role/addAuth', controller.admin.role.addAuth);

  // 主要是菜单和角色的关系
  router.get('/admin/access', controller.admin.access.index);
  router.get('/admin/access/add', controller.admin.access.add);
  router.get('/admin/access/edit', controller.admin.access.edit);
  router.post('/admin/access/addAccess', controller.admin.access.addAccess); // 新增权限保存接口
  router.post('/admin/access/updateAccess', controller.admin.access.updateAccess); // 新增权限保存接口
};
