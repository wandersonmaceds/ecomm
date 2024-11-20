import express from "express";

import getAccountsRouter from "./infra/http/account.router.js";
import getCategoriesRouter from "./infra/http/category.router.js";
import { getAccountRepository } from "./infra/database/repositories/account.repository.js";
import db from "./infra/database/connection.js";
import { getCategoryRepository } from "./infra/database/repositories/category.repository.js";
import {getTokenRouter} from "./infra/http/token.router.js";
import {configureAuth} from "./lib/auth.js";

const app = express();

const accountsRepository = getAccountRepository(db);
const categoriesRepository = getCategoryRepository(db);

const accountsRouter = getAccountsRouter(accountsRepository);
const categoriesRouter = getCategoriesRouter(categoriesRepository);
const tokenRouter = getTokenRouter(accountsRepository);

configureAuth(accountsRepository);

app.use(express.json());
app.use(tokenRouter);
app.use(accountsRouter);
app.use(categoriesRouter);


app.get("/health", async (_, response) => {
  return response.json({ status: "running" });
});

export default app;
