'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Comments', [
      {
        text: '氣氛好',
        UserId: 1,
        RestaurantId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        text: '燈光美',
        UserId: 1,
        RestaurantId: 11,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        text: '空間大',
        UserId: 1,
        RestaurantId: 21,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        text: '服務讚',
        UserId: 11,
        RestaurantId: 11,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        text: '地點好',
        UserId: 11,
        RestaurantId: 21,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        text: '適合聚會',
        UserId: 21,
        RestaurantId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        text: '夜貓子首選',
        UserId: 21,
        RestaurantId: 11,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Comments', null)
  }
}
