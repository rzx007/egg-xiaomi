'use strict';

const { Service } = require('egg');

class RoleService extends Service {
  async roleAdd(row) {
    const { ctx } = this;
    const data = await ctx.model.Role.create(row);
    return data;
  }
}

module.exports = RoleService;
