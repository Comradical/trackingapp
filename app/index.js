import log4js from './config/log4js'
import app from './config/app'
import environment from './config/environment'

const logger = log4js.getLogger('startup')
const port = environment.PORT

let server

const funcs = {
  /**
   * Start express service
   */
  start () {
    server = app.listen(port, () => {
      logger.info(`listening port ${port}`)
    })
  },
  /**
   * Stop express service
   */
  stop () {
    logger.info('Stopping server...')
    server.close()
  }
}

export default funcs
