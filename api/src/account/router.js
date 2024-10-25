import { randomUUID } from "crypto";
import { Router } from "express";
import joi from "joi";

const router = Router();

const HTTP_STATUSES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
};

const accountSchema = joi.object({
  login: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

const accountRepository = {
  _accounts: [],
  save: (account) => accountRepository._accounts.push(account),
  existsByLogin: (login) => accountRepository._accounts.some(account => account.login === login),
}

router.post("/accounts", (request, response) => {
  const { error, value: accountData } = accountSchema.validate(request.body, {
    abortEarly: false,
  });

  if (error) {
    const errorMap = {};
    error.details.forEach((err) => {
      errorMap[err.path] = err.message;
    });
    return response.status(HTTP_STATUSES.BAD_REQUEST).json(errorMap);
  }

  if(accountRepository.existsByLogin(accountData.login)) {
    return response.status(HTTP_STATUSES.BAD_REQUEST).json({login: '"login" already used'});
  }

  const account = {
    ...accountData,
    createdAt: new Date().toUTCString(),
    id: randomUUID(),
  };

  accountRepository.save(account)
  return response.status(HTTP_STATUSES.CREATED).json(account);
});

export default router;
