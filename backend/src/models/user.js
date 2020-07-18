const { Model, DataTypes } = require('sequelize');

/**
 * This is a class that will be a model of our database table
 */

class user extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }
}

module.exports = user;
