// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://postgres:123456@localhost/gerenciador_aluguel',
    migrations: {
      directory: './src/database/migrations'
    }
  },

  staging: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL || 'postegres://ghqjpsnluivsio:1619c251e46c4fbd8524a9ecbc917ec24cc111e2e62acbe8ec07e64f35d353ea@heroku-app/d6bffstktaac2k',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
