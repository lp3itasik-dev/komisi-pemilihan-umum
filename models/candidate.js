'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Candidate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Candidate.belongsTo(models.Organization, {
        foreignKey: 'id_organization',
        as: 'organization'
      });
      Candidate.hasMany(models.CandidateDetail, {
        foreignKey: 'id_candidate',
        as: 'candidate_detail'
      });
    }
  }
  Candidate.init({
    periods: DataTypes.STRING,
    id_organization: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    vision: DataTypes.TEXT,
    mision: DataTypes.TEXT,
    photo: DataTypes.TEXT,
    video: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Candidate',
  });
  return Candidate;
};