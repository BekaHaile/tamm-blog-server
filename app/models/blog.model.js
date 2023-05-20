module.exports = (sequelize, Sequelize) => {
  return sequelize.define("blogs", {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
    },
    content: {
      type: Sequelize.STRING,
    },
    img: {
      type: Sequelize.STRING,
    },
    date: {
      type: Sequelize.DATE,
    },
    userId: {
      type: Sequelize.UUID,
    },
  });
};
