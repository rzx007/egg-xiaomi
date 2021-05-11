/* eslint valid-jsdoc: "off" */

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
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_19921014';
  config.session = {
    key: 'EGG_SESS',
    maxAge: 2 * 3600 * 1000, // 1 天
    httpOnly: true,
    encrypt: true,
  };
  config.static = {
    prefix: '/',
    dir: path.join(appInfo.baseDir, 'app/public'),
    dynamic: true,
    preload: false,
    maxAge: 0,
    buffer: false,
  };
  config.view = {
    mapping: {
      '.html': 'ejs',
    },
  };
  // token密钥
  config.jwt = {
    cert: 'huanggegehaoshuai', // jwt秘钥
  };
  // add your middleware config here
  config.middleware = [ 'auth' ];
  config.auth = {
    match: '/admin',
  };
  config.mongoose = {
    url: 'mongodb://eggadmin:123456@127.0.0.1/egg',
    options: {
      useUnifiedTopology: true,
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
