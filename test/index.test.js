import server from '../app/index'
import chai from 'chai'
import chaiHttp from 'chai-http'
chai.should()
let expect = chai.expect
chai.use(chaiHttp)

describe('#Index', () => {
  describe('#Routes', () => {
    afterEach(() => {
      server.stop()
    })
    beforeEach(() => {
      server.start()
    })
    it('Should start', (done) => {
      chai.request(`http://localhost:${process.env.PORT}`)
        .get('/health')
        .end((err, res) => {
          if (err) { return }
          res.should.have.status(200)
          expect(res.text).to.equal('ok')
          done()
        })
    })
  })
})
