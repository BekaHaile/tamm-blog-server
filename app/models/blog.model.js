const Joi = require("joi");

module.exports = (sequelize, Sequelize) => {
  const Blog = sequelize.define("blogs", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      validate: {
        validateTitle(value) {
          const schema = Joi.string().required().min(2).max(100);
          const { error } = schema.validate(value);
          if (error) {
            throw new Error("Title validation failed");
          }
        },
      },
    },
    content: {
      type: Sequelize.TEXT,
      validate: {
        validateContent(value) {
          const schema = Joi.string().required().min(10);
          const { error } = schema.validate(value);
          if (error) {
            throw new Error("Content validation failed");
          }
        },
      },
    },
    img: {
      type: Sequelize.TEXT,
    },
    userId: {
      type: Sequelize.UUID,
    },
  });

  return Blog;
};
