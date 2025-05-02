'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Organizations', [{
      id_program: null,
      name: 'Badan Eksekutif Mahasiswa',
      description: 'Badan Eksekutif Mahasiswa adalah lembaga eksekutif mahasiswa yang berada di tingkat universitas',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id_program: 1,
      name: 'HIMA MKP',
      description: 'Himpunan Mahasiswa Program Studi Manajemen Keuangan Perbankan',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id_program: 2,
      name: 'HIMA MP',
      description: 'Himpunan Mahasiswa Program Studi Manajemen Pemasaran',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Organizations', null, {});
  }
};
