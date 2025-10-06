const request = require("supertest");
const { expect } = require("chai");
require("dotenv").config();
const { obterToken } = require("../helpers/autenticacao");
const postTransferencia = require("../fixtures/postTrasferencia.json");

describe("Transferencia", () => {
  describe("POST /transferencia", () => {
    let token;

    beforeEach(async () => {
      token = await obterToken("julio.lima", "123456");
    });

    it("Deve retornar status 200 após colocar um valor igual ou maior que R$10,00", async () => {
      const bodyLogin = { ...postTransferencia };

      const response = await request(process.env.BASE_URL)
        .post("/transferencias")
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send(bodyLogin);

      expect(response.status).to.equal(201);
    });
    it("Deve retornar status 422 após colocar um valor menor que R$10,00", async () => {
      const bodyLogin = { ...postTransferencia };
      bodyLogin.valor = 9.99;

      const response = await request(process.env.BASE_URL)
        .post("/transferencias")
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send(bodyLogin);

      expect(response.status).to.equal(422);
    });
  });
});
