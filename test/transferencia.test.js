const request = require("supertest");
const { expect } = require("chai");
require("dotenv").config();
const { obterToken } = require("../helpers/autenticacao");
const postTransferencia = require("../fixtures/postTrasferencia.json");

describe("Transferencia", () => {
  let token;

  beforeEach(async () => {
    token = await obterToken("julio.lima", "123456");
  });

  describe("POST /transferencia", () => {
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
  describe("GET /transferencias/{id}", () => {
    it("Deve retornar com sucesso 200 e dados iguais ao reegistro de transferencia contido no banco de dados quando o ID for valido", async () => {
      const response = await request(process.env.BASE_URL)
        .get("/transferencias/13")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).to.equal(200);
      expect(response.body.conta_origem_id).to.equal(1);
      expect(response.body.conta_destino_id).to.equal(2);
      expect(response.body.valor).to.equal(10.0);
      expect(response.body.valor).to.be.a("number");
    });
  });

  describe("GET /transferencia", () => {
    it("Deve retornar 10 elementos na paginacao quando informar o limite 10 ", async () => {
      const response = await request(process.env.BASE_URL)
        .get("/transferencias?page=1&limit=10")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).to.equal(200);
      expect(response.body.limit).to.equal(10);
      expect(response.body.transferencias).to.have.lengthOf(10);
    });
  });
});
