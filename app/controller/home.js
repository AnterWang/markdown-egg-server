'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async login() {
    const { ctx, app, config } = this;
    const { service, helper } = ctx;
    const { username, password } = ctx.request.body;
    const user = await service.user.findByName(username);
    console.log(user)
    if (!user) {
      ctx.status = 403;
      ctx.body = {
        code: 403,
        message: "Username or password wrong"
      };
    } else {
      if (user.password === helper.encryptPwd(password)) {
        ctx.status = 200;
        const token = app.jwt.sign(
          {
            id: user.id,
            name: user.name,
            role: user.role.name,
            avatar: user.avatar
          },
          config.jwt.secret,
          {
            expiresIn: "1h"
          }
        );
        try {
          await app.redis.set(`token_${user.id}`, token);
          ctx.body = {
            code: 0,
            message: "Get token success",
            token
          };
        } catch (e) {
          console.error(e);
          ctx.body = {
            code: 500,
            message: "Server busy, please try again"
          };
        }
      } else {
        ctx.status = 403;
        ctx.body = {
          code: 403,
          message: "Username or password wrong"
        };
      }
    }
  }

  async userInfo() {
    const { ctx } = this;
    const { user } = ctx.state;
    ctx.status = 200;
    ctx.body = {
      code: 0,
      data: user,
    };
  }

  async logout() {
    const { ctx } = this;
    ctx.status = 200;
    ctx.body = {
      code: 0,
      message: 'Logout success',
    };
  }

}

module.exports = HomeController;
