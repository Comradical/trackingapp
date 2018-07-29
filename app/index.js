import log4js from './config/log4js'
import app from './config/app'

const logger = log4js.getLogger('startup')
const port = 'port'

let server

const funcs = {
  /**
   * Start express service
   */
  start () {
    server = app.listen(app.get(port), () => {
      logger.info(`listening port ${app.get(port)}`)
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
