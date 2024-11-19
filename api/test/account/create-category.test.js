import { describe, it, afterEach } from "node:test";

import agent from "supertest";
import assert from "node:assert";

import app from "../../src/main.js";
import db from "../../src/infra/database/connection.js";

describe("Create Category", () => {
  afterEach(async () => {
    await db.run("DELETE FROM categories");
  });

  it("should create a category given a name", async () => {
    return agent(app)
      .post("/categories")
      .send({
        name: "Eletronicos",
      })
      .expect(201);
  });

  it("should create a category given a name and an existing parent_id", async () => {
    const response = await agent(app)
      .post("/categories")
      .send({ name: "Eletronicos" });

    return agent(app)
      .post("/categories")
      .send({
        name: "Smartphones",
        parentId: response.body.id,
      })
      .expect(201);
  });

  it("should not duplicate a category by name", async () => {
    await agent(app).post("/categories").send({ name: "Eletronicos" });

    return agent(app)
      .post("/categories")
      .send({
        name: "Eletronicos",
      })
      .expect(400)
      .then((response) => {
        assert.deepEqual(response.body, { name: '"Name" already used' });
      });
  });
});
