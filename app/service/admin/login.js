'use strict';

const { Service } = require('egg');
const jwt = require('jsonwebtoken');

class LoginService extends Service {
  doLogin() {
    return 'success';
  }
  //  验证码通过后，登陆操作
  async login(user, password) {
    const { app } = this;
    const userQ = await app.mysql.get('user', { username: user, password });
    if (userQ) {
    // 找到则以用户id生成token
      const token = jwt.sign({
        id: app.config.keys,
      }, app.config.jwt.cert, {
        expiresIn: '10h', // token过期时间
      });
      return {
        username: user,
        avatar_url: userQ.avatar_url,
        token,
      };
    }
  }
}

module.exports = LoginService;
