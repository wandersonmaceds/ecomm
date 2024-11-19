import joi from "joi";
import { randomUUID } from "crypto";
import {validate} from "../../lib/validator.js";

const accountSchema = joi.object({
  login: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

export const createAccount = async (data, accountRepository) => {
  const { isValid, errors, value: account } = await validate(accountSchema, data, [
    {
      validate: async (value) => accountRepository.existsByLogin(value.login),
      name: 'login',
      message: '"login" already used'
    }
  ]);
  
  if (isValid) {
    accountRepository.save(account);
  }

  return {
    error: !isValid ? errors : null,
    account,
  };
};
