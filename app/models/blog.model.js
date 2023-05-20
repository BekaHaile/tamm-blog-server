module.exports = (sequelize, Sequelize) => {
  return sequelize.define("blogs", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
    },
    content: {
      type: Sequelize.STRING,
    },
    img: {
      type: Sequelize.STRING(1024),
    },
    userId: {
      type: Sequelize.UUID,
    },
  });
};
