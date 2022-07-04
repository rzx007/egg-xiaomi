'use strict';
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */

const path = require('path');
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_19921014';
  config.session = {
    key: 'auth_session',
    maxAge: 4 * 3600 * 1000, // 1 天
    httpOnly: true,
    encrypt: true,
    renew: true,
  };
  config.static = {
    prefix: '/',
    dir: path.join(appInfo.baseDir, 'app/public'),
    dynamic: true,
    preload: false,
    maxAge: 0,
    buffer: false,
  };
  // 文件上传
  config.multipart = {
    // mode: 'file',
    tmpdir: path.join(appInfo.baseDir, 'app/public/temp'),
    fields: '100', // 默认表单提交得长度为10
  };
  config.view = {
    mapping: {
      '.html': 'ejs',
    },
  };
  config.security = {
    csrf: {
      ignore: ctx => {
        if (ctx.request.url === '/admin/goods/uploadImg' || ctx.request.url === '/admin/goods/goodsUploadPhoto') {
          return true;
        }
        return false;
      },
    },
  };
  // token密钥
  config.jwt = {
    cert: 'huanggegehaoshuai', // jwt秘钥
  };
  // add your middleware config here
  config.middleware = [ 'auth', 'errorHandler' ];
  // 只对 /api 前缀的 url 路径生效
  config.errorHandler = {
    // match: '/api',
  };
  config.auth = {
    match: '/admin',
  };
  config.mongoose = {
    url: 'mongodb://eggadmin:123456@127.0.0.1/eggcms',
    options: {
      useUnifiedTopology: true,
    },
  };
  // port listen
  config.cluster = {
    listen: {
      port: 8095,
      // hostname: '0.0.0.0',
      // path: '/var/run/egg.sock',
    },
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
