import { describe, it } from "node:test";

import app from "../src/main.js";
import agent from "supertest";

describe("App", () => {
  it("should response with success with status running", (_, done) => {
    agent(app).get("/health").expect(200, { status: "running" }, done);
  });
});
