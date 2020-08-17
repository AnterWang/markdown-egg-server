'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  
  router.resources("roles", "/roles", controller.role);
  router.resources('users', '/users', controller.user);
};
