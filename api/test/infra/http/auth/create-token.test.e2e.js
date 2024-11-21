import { afterEach, describe, it } from "node:test";
import assert from "node:assert";
import agent from "supertest";

import db from "../../../../src/infra/database/connection.js";
import app from "../../../../src/main.js";

const account = { login: "hoy@mail.com", password: "passwd" };

describe("Create Token", () => {
  afterEach(async () => {
    await db.run("DELETE FROM accounts");
  });

  it("should not create a token for a non-existing account", async () => {
    await agent(app)
      .post("/tokens")
      .send(account)
      .expect(400)
      .then((response) => {
        assert.deepEqual(
          { account: "login or password does not match" },
          response.body,
        );
      });
  });

  it("should create a token account", async () => {
    await agent(app).post("/accounts").send(account);

    const response = await agent(app).post("/tokens").send(account);
    assert.deepEqual(response.status, 201);
    assert.notEqual(response.body.token, "");
  });
});
