import express from "express";

import accountsRouter from "./account/router.js";

const app = express();

app.use(express.json());
app.use(accountsRouter);

app.get("/health", async (_, response) => {
  return response.json({ status: "running" });
});

export default app;
