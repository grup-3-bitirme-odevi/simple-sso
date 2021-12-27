const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect
chai.use(chaiHttp);
const server = require("../app")

describe("SSO contoller", async () => {
    before(function( done ) {
        server.listen(3100, function(err) {
            done(err);
        })
    });
    
    afterAll(function( done ) {
        server.close(function(err) {
            done(err);
        });
    });
    
    it("Post isAuthorized", done => {
        chai.request(server).post("/?redirectURL=http://localhost:3020")
            .send({
                username: "admin",
                password: "123456",
                pass_hash: true
            })
            .end((error, res) => {
                console.log(res.body.stat)
                const token = res.body.access_token
                global.token = token

                // try {expect(res.status).to.be.equal(200)}
                // catch(err) {
                //     console.log('hata')
                //     expect(res.status).to.be.equal(404)
                // }

                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8')
                expect(res.body.stat).to.be.equal('success')
                expect(res.body.message).to.be.equal('login success')
                expect(res.body.access_token).to.be.equal(token)

                done()
            });
    });
    it("Get isAccessTokenValid", done => {
        chai.request(server).get("/avalidate")
            .set("Authorization", "Bearejr " + token)
            .end(function (err, res) {
                console.log(err)
                expect(res.status).to.be.equal(200);
                expect(res.headers['content-type']).to.equal('application/json; charset=utf-8')
                expect(res.body.stat).to.be.equal('success')
                done()
            });
    });
});


