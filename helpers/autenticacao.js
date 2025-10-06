const request = require("supertest");
require("dotenv").config();
const postLogin = require("../fixtures/postLogin.json");

const obterToken = async (username, senha) => {
  const bodyLogin = { ...postLogin };

  const responseLogin = await request(process.env.BASE_URL)
    .post("/login")
    .set("Content-Type", "application/json")
    .send(bodyLogin);

  return responseLogin.body.token;
};

module.exports = {
  obterToken,
};
