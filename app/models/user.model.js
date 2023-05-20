module.exports = (sequelize, Sequelize) => {
  return sequelize.define("users", {
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
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false,
    },
    password: {
      type: Sequelize.STRING,
    },
    img: {
      type: Sequelize.STRING,
    },
  });
};
