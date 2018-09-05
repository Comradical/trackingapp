import loggerConfig from './log4js-config'
import log4js from 'log4js'
import environment from './environment'
log4js.configure(loggerConfig[environment.environment || 'DEVELOPMENT'])
export default log4js
