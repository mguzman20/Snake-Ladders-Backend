const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.User, {
        foreignKey: 'id',
      });
    }
  }
  Game.init({
    game_finished: DataTypes.BOOLEAN,
    user_1: DataTypes.INTEGER,
    user_2: DataTypes.INTEGER,
    user_3: DataTypes.INTEGER,
    user_4: DataTypes.INTEGER,
    player_turn: DataTypes.INTEGER,
    position_1: DataTypes.INTEGER,
    position_2: DataTypes.INTEGER,
    position_3: DataTypes.INTEGER,
    position_4: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};
