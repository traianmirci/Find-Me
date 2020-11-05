global.mocha = require("mocha");
global.chai = require("chai");
global.chaiHttp = require("chai-http");
const mongoose = require("mongoose");
const assert = require("assert");
const dotenv = require("dotenv");
global.expect = chai.expect;
global.assert = chai.assert;
global.app = require("../server");

dotenv.config({ path: `./config/.env.test` });

//Configure chai
chai.use(chaiHttp);
chai.should();
chai.config.includeStack = true;

before(function (done) {
  app.on("ready", function () {
    function clearCollections() {
      for (var collection in mongoose.connection.collections) {
        console.log("Borrando collection " + collection);
        mongoose.connection.collections[collection].deleteMany();
      }
      return done();
    }

    if (mongoose.connection.readyState === 0) {
      mongoose.connect(config.test.db, function (err) {
        if (err) throw err;
        return clearCollections();
      });
    } else {
      return clearCollections();
    }
    done();
  });
});

after(function () {
  //mongoose.connection.close();
});

const userTest = require("./auth.test");
