/*
 * @Author: rzx007
 * @Date: 2021-05-16 13:07:13
 * @LastEditors: rzx007
 * @LastEditTime: 2021-05-16 15:26:25
 * @FilePath: \init\app\controller\admin\home.js
 * @Description: Do not edit
 */

'use strict';

const Controller = require('./baseController.js');

class HomeController extends Controller {
  async index() {
    await this.ctx.render('admin/layout/index');
  }
}

module.exports = HomeController;
