'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Faculty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Faculty.hasMany(models.Program, {
        foreignKey: 'id_faculty',
        as: 'program'
      });
    }
  }
  Faculty.init({
    name: DataTypes.STRING,
    dean: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Faculty',
  });
  return Faculty;
};