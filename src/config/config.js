const dotenv = require('dotenv')
const { connect, default: mongoose } = require('mongoose')
const { program } = require('./commander')
const { logger } = require('../utils/logger')


const { mode } = program.opts()


dotenv.config({
    path: mode === 'production' ? './.env' : './.env' 
})

const configObject = {
    port: process.env.port || 8080,
    mongo_uri: process.env.MONGO_URI,
    jwt_secret_key: process.env.JWT_SECRET_KEY,
    persistence: process.env.PERSISTENCE,
    gmail_user_app: process.env.GMAIL_USER_APP,
    gmail_password_app: process.env.GMAIL_USER_PASSWORD,
    stripe_secret_key: process.env.STRIPE_SECRET_KEY

}

const connectDb = async () => {
  try {
      
      MongoSingleton.getInstance()
      logger.info("Db connected")
  } catch(err) {
      logger.error(err)
  }
}


class MongoSingleton {
  static instance 
  constructor() {
    connect(process.env.MONGO_URI)
  }

  static getInstance() {
    if(!this.instance){
      logger.info('Connecting to data base')
      return this.instance = new MongoSingleton()
    }
    logger.info('Data base already connected')
    return this.instance
  }
}

module.exports = {
  configObject,
  connectDb,
}