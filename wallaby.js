process.env.BABEL_ENV = 'Test'
process.env.ENVIRONMENT = 'DEVELOPMENT'
module.exports = function (wallaby) {
  return {
    files: [
      'app/**/*.js'
    ],
    'hints': {
      'ignoreCoverage': '/istanbul ignore/'
    },

    tests: [
      'test/**/*test.js',
      '!test/standard.test.js',
      {pattern: '.env', instrument: false}
    ],
    testFramework: 'mocha',
    env: {
      type: 'node',
      runner: 'node'
    },
    compilers: {
      '**/*.js': wallaby.compilers.babel()
    },
    setup: function (wallaby) {
      require('dotenv').config()
      var mocha = wallaby.testFramework
      mocha.timeout(1500)
      mocha.ui('tdd')
    }
  }
}
