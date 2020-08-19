/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1597632056479_570';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    sequelize: {
      dialect: "mysql",
      host: "localhost",
      port: "3306",
      database: "demo",
      username: "root",
      password: "wzp123456"
    },

    jwt: {
      secret: "123456"
    },

    redis: {
      client: {
        port: 6379, 
        host: '127.0.0.1',
        password: 'auth',
        db: 0,
      },
    },

    security: {
      csrf: {
        enable: false,
      },
    },
    cors: {
      origin: '*',
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    },

  }

  return {
    ...config,
    ...userConfig,
  };
};
