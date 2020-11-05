const logins = require("../_data/logins");
const users = require("../_data/users");

var registeredUserId = "";
var tokenAuth = "";

describe("Auth tests", function () {
  it("should register user 1", function (done) {
    console.log("Registering user".yellow);
    // Register user 1
    chai
      .request("http://localhost:5000")
      .post("/api/v1/user/")
      .send(users[0])
      .end(function (err, res) {
        expect(res).to.have.status(201);
        registeredUserId = res.body.data._id;
        console.log("User inserted with id:", registeredUserId.cyan);
        done();
      });
  });

  it("should login", function (done) {
    console.log("Logging user");
    console.log({ email: users[0]["email"], password: users[0]["password"] });
    var userId = "";
    chai
      .request("http://localhost:5000")
      .post("/api/v1/auth/login")
      .send({ email: users[0]["email"], password: users[0]["password"] })
      .end(function (err, res) {
        expect(res).to.have.status(200);
        console.log(
          "User logged in, obtained token: " + res.body.token,
          userId.cyan
        );
        tokenAuth = res.body.token;
        done();
      });
  });

  it("should modify user 1", function (done) {
    console.log("Modifying user".yellow);
    console.log(
      "voy a enviar el token " +
        tokenAuth +
        "del usuario" +
        registeredUserId +
        "con el contenido: ",
      {
        bio: "jeje",
        token: tokenAuth,
      }
    );
    // Register user 1
    let newBio = "Bio is no longer boring.";
    chai
      .request("http://localhost:5000")
      .put("/api/v1/user/" + registeredUserId)
      .send({ bio: newBio, token: tokenAuth })
      .set("Authorization", "Bearer " + tokenAuth)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        console.log("User updated", userId.cyan);
        console.log("mi debug");
        console.log(err);
        done();
      });

    done();
  });
  /*
  it("should delete user 1", function () {
    chai
      .request("http://localhost:5000")
      .delete("/api/v1/user/")
      .send(registeredUserId)
      .end(function (err, res) {
        expect(res).to.have.status(200);
        deleted = true;
        done();
      });
  });
*/
  it("Login fail");
});
