'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Programs', [{
      id_faculty: 1,
      name: 'D3 Manajemen Keuangan Perbankan',
      headofprogram: 'Monika Sutarsa, M.Ak',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id_faculty: 2,
      name: 'D3 Manajemen Pemasaran',
      headofprogram: 'Ernawati, M.M',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Programs', null, {});
  }
};
