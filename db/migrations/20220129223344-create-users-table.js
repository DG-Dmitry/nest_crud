module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async transaction => {
      await queryInterface.sequelize.query(
        `
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        CREATE EXTENSION IF NOT EXISTS "citext";
      `,
        {
          transaction,
        },
      )

      await queryInterface.createTable(
        'users',
        {
          id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.fn('uuid_generate_v4'),
          },
          name: {
            type: Sequelize.STRING,
          },

          email: {
            type: 'citext',
            unique: true,
          },

          phone_number: {
            type: Sequelize.STRING,
            unique: true,
          },

          password: {
            type: Sequelize.STRING,
            allowNull: true,
          },

          created_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          },

          updated_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          },
        },
        {
          transaction,
        },
      )
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('users')
  },
}
