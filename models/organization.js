'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Organization.belongsTo(models.Program, {
        foreignKey: 'id_program',
        as: 'program'
      });
      Organization.hasMany(models.Candidate, {
        foreignKey: 'id_organization',
        as: 'candidate'
      });
    }
  }
  Organization.init({
    id_program: DataTypes.INTEGER,
    name: DataTypes.STRING,
    logo: DataTypes.TEXT('long'),
    description: DataTypes.TEXT,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Organization',
  });
  return Organization;
};