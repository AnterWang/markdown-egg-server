module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;
  
    const Role = app.model.define("role", {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(30),
      created_at: DATE,
      updated_at: DATE
    });
  
    // 这里定义与 users 表的关系，一个角色可以含有多个用户，外键相关
    Role.associate = () => {
      app.model.Role.hasMany(app.model.User, { as: "users" });
    };
  
    return Role;
  };
  