const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(/* models */) {
      // assosations
    }
  }
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    mail: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
