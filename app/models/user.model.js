const Joi = require("joi");

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        validateEmail(value) {
          const schema = Joi.string().email().required();
          const { error } = schema.validate(value);
          if (error) {
            throw new Error("Email validation failed");
          }
        },
      },
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false,
      validate: {
        validateUsername(value) {
          const schema = Joi.string().required().min(3).max(30);
          const { error } = schema.validate(value);
          if (error) {
            throw new Error("Username validation failed");
          }
        },
      },
    },
    password: {
      type: Sequelize.STRING,
      validate: {
        validatePassword(value) {
          const schema = Joi.string().required().min(6);
          const { error } = schema.validate(value);
          if (error) {
            throw new Error("Password validation failed");
          }
        },
      },
    },
    img: {
      type: Sequelize.TEXT,
    },
  });

  return User;
};
