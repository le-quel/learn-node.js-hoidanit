'use strict';

module.exports = {
  
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@email.com',
      password: '123456',  //plain text sdsfgdf12345 ->hash pasword
      firstName: 'HoiDanIt',
      lastName: 'Eric',
      address: 'USA',
      gender: 1,
      typeRole: 'R1',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
