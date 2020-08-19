'use strict';

const koajwt = require("koa-jwt2");
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  router.get('/', controller.home.index);

  router.post("/login", controller.home.login);
  router.get("/user-info", jwt, controller.home.userInfo);
  const isRevokedAsync = function(req, payload) {
    return new Promise(resolve => {
      try {
        const userId = payload.id;
        const tokenKey = `token_${userId}`;
        const token = app.redis.get(tokenKey);
        if (token) {
          app.redis.del(tokenKey);
        }
        resolve(false);
      } catch (e) {
        resolve(true);
      }
    });
  };
  router.post(
    "/logout",
    koajwt({
      secret: app.config.jwt.secret,
      credentialsRequired: false,
      isRevoked: isRevokedAsync
    }),
    controller.home.logout
  );
  
  router.resources("roles", "/roles", controller.role);
  router.resources('users', '/users', controller.user);
};
