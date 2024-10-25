import { describe, it } from "node:test";

import agent from "supertest";
import assert from "node:assert";

import app from "../../src/main.js";

describe("Create Account", () => {
  it("should create an account with email and password", async () => {
    return agent(app)
      .post("/accounts")
      .send({
        login: "wands@ecomm.com",
        password: "passwd",
      })
      .expect(201);
  });

  it("should not create an account without sending any data", async () => {
    return agent(app)
      .post("/accounts")
      .send({})
      .expect(400)
      .then((response) => {
        const expected = {
          login: '"login" is required',
          password: '"password" is required',
        };
        assert.deepEqual(response.body, expected);
      });
  });

  it("should not create an account with an invalid email", async () => {
    return agent(app)
      .post("/accounts")
      .send({
        login: "hey.com",
        password: "passwd",
      })
      .expect(400)
      .then((response) => {
        const expected = {
          login: '"login" must be a valid email',
        };
        assert.deepEqual(response.body, expected);
      });
  });

  it("should not create an account with an already used email", async () => {
    const account = {
      login: "wands@ecomm.com",
      password: "passwd",
    };

    return agent(app)
      .post("/accounts")
      .send(account)
      .then(async () => {
        return agent(app)
          .post("/accounts")
          .send(account)
          .expect(400)
          .then((response) => {
            const expected = {
              login: '"login" already used',
            };
            assert.deepEqual(response.body, expected);
          });
      });
  });
});
