/* eslint @typescript-eslint/no-var-requires: "off" */
require('dotenv').config({ path: '.development.env' })

const defaultConfig = {
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT || 3000),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  dialect: 'postgres',
}

console.log(defaultConfig, `.${process.env.NODE_ENV}.env`)

module.exports = {
  development: {
    ...defaultConfig,
  },
}
