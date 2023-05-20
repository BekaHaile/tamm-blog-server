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
      type: Sequelize.TEXT,
    },
    img: {
      type: Sequelize.TEXT,
    },
    userId: {
      type: Sequelize.UUID,
    },
  });
};
