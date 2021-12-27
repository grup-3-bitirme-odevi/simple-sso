const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect
const db = require("../model");
// const User = db.user;
chai.use(chaiHttp);
const server = require("../app")

describe("SSO contoller", async () => {
    it("Post isAuthorized", done => {
        chai.request(server).post("/?redirectURL=http://localhost:3020")
            .send({
                username: "admin",
                password: "123456",
                pass_hash: true
            })
            .end((error, res) => {
                console.log(res.body.stat)
                expect(res.body.stat).to.be.equal('success')
                const token = res.body.access_token
                global.token = token
                done()

            });
    });
    it("Get isAccessTokenValid", done => {
        chai.request(server).get("/validate")
            .set("Authorization", "Bearer " + token)
            .end((error, res) => {
                console.log(res.body.stat)
                expect(res.body.stat).to.be.equal('success')
                done()
            });
    });
});


