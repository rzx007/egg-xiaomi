/*
 * @Author: rzx007
 * @Date: 2021-05-08 12:39:10
 * @LastEditors: rzx007
 * @LastEditTime: 2021-05-29 18:54:37
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
  router.get('/admin/common/changeStatus', controller.admin.baseController.changeStatus); // 公共删改变数据状态,传入model名称和_id
  router.get('/admin/common/editNum', controller.admin.baseController.editNum); // 公共删改变数据得值（number）,传入model名称和_id

  router.get('/admin/home', controller.admin.home.index);
  // 用户增删改
  router.get('/admin/manager', controller.admin.manager.index);
  router.get('/admin/manager/add', controller.admin.manager.add); // 用户新增页面
  router.post('/admin/manager/addUser', controller.admin.manager.addUser); // 新增用户保存接口
  router.get('/admin/manager/edit', controller.admin.manager.edit); // 编辑用户页面
  router.post('/admin/manager/updateUser', controller.admin.manager.updateUser); // 编辑提交保存接口
  router.post('/admin/manager/upload', controller.admin.manager.upload); // 编辑提交保存接口

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

  // 轮播图文件上传
  router.get('/admin/carousel', controller.admin.carousel.index);
  router.get('/admin/carousel/add', controller.admin.carousel.add);
  router.get('/admin/carousel/edit', controller.admin.carousel.edit);
  router.post('/admin/carousel/addCarousel', controller.admin.carousel.addCarousel);
  router.post('/admin/carousel/updateCarousel', controller.admin.carousel.updateCarousel);

  // 商品类型
  router.get('/admin/goodsType', controller.admin.goodsType.index);
  router.get('/admin/goodsType/add', controller.admin.goodsType.add);
  router.get('/admin/goodsType/edit', controller.admin.goodsType.edit);
  router.post('/admin/goodsType/addGoods', controller.admin.goodsType.addGoods);
  router.post('/admin/goodsType/updateGoods', controller.admin.goodsType.updateGoods);

  // 商品类型属性
  router.get('/admin/goodsTypeAttr', controller.admin.goodsTypeAttr.index);
  router.get('/admin/goodsTypeAttr/add', controller.admin.goodsTypeAttr.add);
  router.get('/admin/goodsTypeAttr/edit', controller.admin.goodsTypeAttr.edit);
  router.post('/admin/goodsTypeAttr/addGoods', controller.admin.goodsTypeAttr.addGoods);
  router.post('/admin/goodsTypeAttr/updateGoods', controller.admin.goodsTypeAttr.updateGoods);

  // 商品分类，参考小米首页得分类
  router.get('/admin/goodsCate', controller.admin.goodsCate.index);
  router.get('/admin/goodsCate/add', controller.admin.goodsCate.add);
  router.get('/admin/goodsCate/edit', controller.admin.goodsCate.edit);
  router.post('/admin/goodsCate/addGoods', controller.admin.goodsCate.addGoods);
  router.post('/admin/goodsCate/updateGoods', controller.admin.goodsCate.updateGoods);

  // 商品
  router.get('/admin/goods', controller.admin.goods.index);
  router.get('/admin/goods/add', controller.admin.goods.add);
  router.get('/admin/goods/edit', controller.admin.goods.edit);
  router.post('/admin/goods/addGoods', controller.admin.goods.addGoods);
  router.post('/admin/goods/updateGoods', controller.admin.goods.updateGoods);
  router.get('/admin/goodsTypeAttr/getGoodsTypeAttrByTypeId', controller.admin.goodsTypeAttr.getGoodsTypeAttrByTypeId);
};
