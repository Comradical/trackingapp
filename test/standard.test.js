import standard from 'mocha-standard'

describe('standarjs', () => {
  describe('Coding style', () => {
    it('app conforms to standard', standard.files([
      '*.js',
      'app/**/*.js'
    ]))

    it('tests conform to standard', standard.files([
      'test/**/*test.js'
    ], {
      global: [ 'describe', 'it', 'before', 'beforeEach', 'after', 'afterEach', 'should', 'app' ]
    }))
  })
})
