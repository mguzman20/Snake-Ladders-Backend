/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Games', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      game_finished: {
        type: Sequelize.BOOLEAN,
      },
      user_1: {
        type: Sequelize.INTEGER,
      },
      user_2: {
        type: Sequelize.INTEGER,
      },
      user_3: {
        type: Sequelize.INTEGER,
      },
      user_4: {
        type: Sequelize.INTEGER,
      },
      player_turn: {
        type: Sequelize.INTEGER,
      },
      position_1: {
        type: Sequelize.INTEGER,
      },
      position_2: {
        type: Sequelize.INTEGER,
      },
      position_3: {
        type: Sequelize.INTEGER,
      },
      position_4: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Games');
  },
};
