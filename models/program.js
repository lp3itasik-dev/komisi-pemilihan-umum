'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Program extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Program.hasMany(models.Organization, {
        foreignKey: 'id_program',
        as: 'organization'
      });
      Program.hasMany(models.User, {
        foreignKey: 'id_program',
        as: 'user'
      });
      Program.belongsTo(models.Faculty, {
        foreignKey: 'id_faculty',
        as: 'faculty'
      });
    }
  }
  Program.init({
    id_faculty: DataTypes.INTEGER,
    name: DataTypes.STRING,
    headofprogram: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Program',
  });
  
  return Program;
};