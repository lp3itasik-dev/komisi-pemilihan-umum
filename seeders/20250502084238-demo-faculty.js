'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Faculties', [{
      name: 'Pendidikan Diploma',
      dean: 'Muhammad Aripin, S.Kom',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Pendidikan Vokasi',
      dean: 'Yovi Fernando, S.T',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Faculties', null, {});
  }
};
