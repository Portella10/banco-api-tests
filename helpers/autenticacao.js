const request = require("supertest");
require("dotenv").config();

const obterToken = async (username, senha) => {
  const responseLogin = await request(process.env.BASE_URL)
    .post("/login")
    .set("Content-Type", "application/json")
    .send({
      username: username,
      senha: senha,
    });

  return responseLogin.body.token;
};

module.exports = {
  obterToken,
};
