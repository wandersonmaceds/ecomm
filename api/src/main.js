import express from "express";

import accountsRouter from "./app/account/router.js";
import categoriesRouter from "./app/category/router.js";

const app = express();

app.use(express.json());
app.use(accountsRouter);
app.use(categoriesRouter);

app.get("/health", async (_, response) => {
  return response.json({ status: "running" });
});

export default app;
