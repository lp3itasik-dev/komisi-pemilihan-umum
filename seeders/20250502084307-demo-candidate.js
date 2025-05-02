'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Candidates', [{
      periods: '2025-2026',
      id_organization: 1,
      name: 'AMIN',
      description: 'AMIN adalah Anies Baswedan dan Muhaimin Iskandar',
      vision: 'Mewujudkan Indonesia yang lebih baik',
      mision: 'Mewujudkan Indonesia yang lebih baik dengan cara yang lebih baik',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      periods: '2025-2026',
      id_organization: 1,
      name: 'GEMOY',
      description: 'GEMOY adalah Ganjar Pranowo dan Prabowo Subianto',
      vision: 'Mewujudkan Indonesia yang lebih baik',
      mision: 'Mewujudkan Indonesia yang lebih baik dengan cara yang lebih baik',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      periods: '2025-2026',
      id_organization: 1,
      name: 'GAMUD',
      description: 'GAMUD adalah Ganjar Pranowo dan Muhaimin Iskandar',
      vision: 'Mewujudkan Indonesia yang lebih baik',
      mision: 'Mewujudkan Indonesia yang lebih baik dengan cara yang lebih baik',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Candidates', null, {});
  }
};
