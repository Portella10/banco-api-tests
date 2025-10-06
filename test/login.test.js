const request = require("supertest");
const { expect } = require("chai");
require("dotenv").config();

describe("Login", () => {
  describe("POST /Login", () => {
    it("Deve retornar status 200 com o token do tipo string ", async () => {
      const response = await request(process.env.BASE_URL)
        .post("/login")
        .set("Content-Type", "application/json")
        .send({
          username: "julio.lima",
          senha: "123456",
        });

      expect(response.status).to.equal(200);
      expect(response.body.token).to.be.a("string");
    });
  });
});
