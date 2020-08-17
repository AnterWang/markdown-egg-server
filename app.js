"use strict";

class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  async willReady() {
    // 这里只能在开发模式下同步数据库表格
    const isDev = process.env.NODE_ENV === "development";
    if (isDev) {
      try {
        console.log("Start syncing database models...");
        await this.app.model.sync({ logging: console.log, force: isDev });
        console.log("Start init database data...");
        await this.app.model.query(
          "INSERT INTO roles (id, name, created_at, updated_at) VALUES (1, 'admin', '2020-02-04 09:54:25', '2020-02-04 09:54:25'),(2, 'editor', '2020-02-04 09:54:30', '2020-02-04 09:54:30');"
        );
        await this.app.model.query(
          "INSERT INTO users (id, name, password, age, avatar, introduction, created_at, updated_at, role_id) VALUES (1, 'admin', 'e10adc3949ba59abbe56e057f20f883e', 20, 'https://yugasun.com/static/avatar.jpg', 'Fullstack Engineer', '2020-02-04 09:55:23', '2020-02-04 09:55:23', 1);"
        );
        // await this.app.model.query(
        //   "INSERT INTO posts (id, title, content, created_at, updated_at, user_id) VALUES (2, 'Awesome Egg.js', 'Egg.js is a awesome framework', '2020-02-04 09:57:24', '2020-02-04 09:57:24', 1),(3, 'Awesome Serverless', 'Build web, mobile and IoT applications using Tencent Cloud and API Gateway, Tencent Cloud Functions, and more.', '2020-02-04 10:00:23', '2020-02-04 10:00:23', 1);"
        // );
        console.log("Successfully init database data.");
        console.log("Successfully sync database models.");
      } catch (e) {
        console.log(e);
        throw new Error("Database migration failed.");
      }
    }
  }
}

module.exports = AppBootHook;
