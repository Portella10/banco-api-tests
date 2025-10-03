const request = require("supertest");
const { expect } = require("chai");

describe("Transferencia", () => {
  describe("POST /transferencia", () => {
    it("Deve retornar status 200 após colocar um valor igual ou maior que R$10,00", async () => {
      const responseLogin = await request("http://localhost:3000")
        .post("/login")
        .set("Content-Type", "application/json")
        .send({
          username: "julio.lima",
          senha: "123456",
        });

      const token = responseLogin.body.token;

      const response = await request("http://localhost:3000")
        .post("/transferencias")
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          contaOrigem: 1,
          contaDestino: 2,
          valor: 10.0,
          token: "",
        });

      expect(response.status).to.equal(201);

      console.log(response.body);
    });
    it("Deve retornar status 422 após colocar um valor menor que R$10,00", () => {});
  });
});
