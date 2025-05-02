'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CandidateDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CandidateDetail.belongsTo(models.Candidate, {
        foreignKey: 'id_candidate',
        as: 'candidate'
      });
    }
  }
  CandidateDetail.init({
    id_candidate: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'CandidateDetail',
  });
  return CandidateDetail;
};