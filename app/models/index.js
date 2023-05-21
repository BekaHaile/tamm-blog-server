import config from "../config/db.config.js";

import Sequelize from "sequelize";
import userModel from "../models/user.model.js";
import blogModel from "../models/blog.model.js";

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  port: config.PORT,
  dialect: config.dialect,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
  logging: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = userModel(sequelize, Sequelize);
db.blog = blogModel(sequelize, Sequelize);

db.blog.belongsTo(db.user, { foreignKey: "userId" });

export default db;
