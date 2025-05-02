'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      identity: '6281313608558',
      name: 'Administrator',
      username: 'admin',
      password: 'admin',
      role: 'A',
      id_program: null,
      classes: null,
      status: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      identity: '201702102',
      name: 'Lerian Febriana',
      username: 'kanglerian',
      password: 'kanglerian',
      role: 'P',
      id_program: null,
      classes: null,
      status: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      identity: '202326147',
      name: 'Nabila Azzahra',
      username: 'nabilaazzahra',
      password: 'nabilaazzahra',
      role: 'P',
      id_program: 1,
      classes: "MKP01",
      status: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      identity: '202026128',
      name: 'Asep Manarul Hidayah',
      username: 'asepmanarul',
      password: 'asepmanarul',
      role: 'P',
      id_program: 1,
      classes: "MP01",
      status: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
