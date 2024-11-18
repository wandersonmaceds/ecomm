import { Router } from "express";

import { HTTP_STATUSES } from '../lib/http.js';
import { accountRepository } from './account.repository.js'
import { createAccount } from './create-account.js';

const router = Router();

router.post("/accounts", (request, response) => {
  const { error, account } = createAccount(request.body, accountRepository);

  if (error) {
    return response.status(HTTP_STATUSES.BAD_REQUEST).json(error);
  }
  return response.status(HTTP_STATUSES.CREATED).json(account);
});

export default router;
