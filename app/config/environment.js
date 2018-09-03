const dotenv = require('dotenv')
dotenv.config({silent: true})

var config = {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  ENVIRONMENT: process.env.ENVIRONMENT,
  LOOP_SHIELD_URL: process.env.LOOP_SHIELD_URL,
  LOOP_REQUEST_PATH: process.env.LOOP_REQUEST_PATH,
  AC_URL: process.env.AC_URL,
  AC_API_KEY: process.env.AC_API_KEY,
  PASSWORD: process.env.PASSWORD,
  PORT: process.env.PORT
}

export default config
