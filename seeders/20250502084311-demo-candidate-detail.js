'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('CandidateDetails', [{
      id_candidate: 1,
      name: 'Anies Baswedan',
      description: 'Anies Baswedan adalah seorang akademisi, penulis, dan politisi asal Indonesia. Ia menjabat sebagai Gubernur DKI Jakarta sejak 2017 hingga 2022.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      id_candidate: 1,
      name: 'Muhaimin Iskandar',
      description: 'Muhaimin Iskandar adalah seorang politisi Indonesia yang menjabat sebagai Ketua Umum Partai Kebangkitan Bangsa (PKB) sejak 2005.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      id_candidate: 2,
      name: 'Ganjar Pranowo',
      description: 'Ganjar Pranowo adalah seorang politisi Indonesia yang menjabat sebagai Gubernur Jawa Tengah sejak 2013.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      id_candidate: 2,
      name: 'Prabowo Subianto',
      description: 'Prabowo Subianto adalah seorang jenderal purnawirawan TNI Angkatan Darat dan politisi Indonesia. Ia menjabat sebagai Menteri Pertahanan Republik Indonesia sejak 2019.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      id_candidate: 3,
      name: 'Ganjar Pranowo',
      description: 'Ganjar Pranowo adalah seorang politisi Indonesia yang menjabat sebagai Gubernur Jawa Tengah sejak 2013.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      id_candidate: 3,
      name: 'Muhaimin Iskandar',
      description: 'Muhaimin Iskandar adalah seorang politisi Indonesia yang menjabat sebagai Ketua Umum Partai Kebangkitan Bangsa (PKB) sejak 2005.',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('CandidateDetails', null, {});
  }
};
