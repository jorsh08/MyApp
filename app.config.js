const { config } = require('dotenv')
config() // carga variables de .env en process.env

module.exports = ({ config: expoConfig }) => {
  return {
    ...expoConfig,
    extra: {
      API_URL: process.env.API_URL,
      API_KEY: process.env.API_KEY
    }
  }
}