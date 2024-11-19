import { Router } from "express";

import { HTTP_STATUSES } from "../../lib/http.js";
import { createAccount } from "../../app/account/create-account.js";

export default function getAccountRouter(accountRepository) {
  const accountRouter = Router();

  accountRouter.post("/accounts", async (request, response) => {
    const { error, account } = await createAccount(
      request.body,
      accountRepository,
    );

    if (error) {
      return response.status(HTTP_STATUSES.BAD_REQUEST).json(error);
    }
    return response.status(HTTP_STATUSES.CREATED).json(account);
  });

  return accountRouter;
}
