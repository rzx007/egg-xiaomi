/*
 * @Author: rzx007
 * @Date: 2021-05-12 00:28:46
 * @LastEditors: rzx007
 * @LastEditTime: 2021-05-14 21:40:50
 * @FilePath: \init\app\service\admin\admin.js
 * @Description: 检查登录用户所能访问的菜单权限
 */
'use strict';
const Service = require('egg').Service;
const url = require('url');
class AdminService extends Service {
  async checkAuth() {
    /*
        1、获取当前用户的角色        （超级管理员直接放过    is_super:1）
        2、根据角色获取当前角色的权限列表
        3、获取当前访问的url 对应的权限id
        4、判断当前访问的url对应的权限id 是否在权限列表中的id中
    */
    // 1、获取当前用户的角色
    const userinfo = this.ctx.session.userinfo;
    const role_id = userinfo.role_id;
    const pathname = url.parse(this.ctx.request.url).pathname; // 获取当前用户访问的地址
    // 忽略权限判断的地址    is_super表示是管理员
    const ignoreUrl = [ '/login', '/admin/getCaptcha', '/doLogin', '/loginOut' ];
    if (ignoreUrl.includes(pathname) || userinfo.is_super === 1) {
      return true; // 超级管理员允许访问
    }
    // 2、根据角色获取当前角色的权限列表
    const accessResult = await this.ctx.model.RoleAccess.find({ role_id });
    const accessArray = []; // 当前角色可以访问的权限列表
    accessResult.forEach(value => {
      accessArray.push(value.access_id.toString());
    });
    // 3、获取当前访问的url 对应的权限id
    const accessUrlResult = await this.ctx.model.Access.find({ url: pathname });
    // 4、判断当前访问的url对应的权限id 是否在权限列表中的id中
    if (accessUrlResult.length > 0) {
      if (accessArray.includes(accessUrlResult[0]._id.toString())) {
        return true;
      }
      return false;
    }
    return true; // 当前访问地址不在前权限表，说明可能是ignoreUrl，或者是其他api接口请求，放行
  }
  async getMenu(role_id) {
    const { ctx } = this;
    // 查询所有权限，并分组
    const rows = await ctx.model.Access.aggregate([
      { $match: { module_id: '0' } },
      {
        $lookup: {
          from: 'access',
          localField: '_id',
          foreignField: 'module_id',
          as: 'items',
        },
      },
    ]);
    // 查询当前角色拥有的权限（查询当前角色的权限id） 把查找到的数据放在数组中
    const accessReulst = await ctx.model.RoleAccess.find({ role_id }, { access_id: true });
    const roleAccessArray = [];
    accessReulst.forEach(value => {
      roleAccessArray.push(value.access_id.toString());
    });
    // 筛选
    rows.forEach(item => {
      if (roleAccessArray.indexOf(item._id.toString()) > -1) {
        item.checked = true;
        if (item.items) {
          item.items.forEach(ele => {
            if (roleAccessArray.indexOf(ele._id.toString()) > -1) {
              ele.checked = true;
            }
          });
        }
      }
    });
    return rows;
  }
}

module.exports = AdminService;
