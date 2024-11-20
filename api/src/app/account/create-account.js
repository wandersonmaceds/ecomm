import { validate } from "../../lib/validator.js";
import { hashPassword } from "../../lib/password.js";
import {accountSchema} from "./account.schema.js";

export const createAccount = async (data, accountRepository) => {
  const {
    isValid,
    errors,
    value: account,
  } = await validate(
    accountSchema,
    data,
    [
      {
        validate: async (value) => accountRepository.existsByLogin(value.login),
        name: "login",
        message: '"login" already used',
      },
    ],
    (value) => ({ ...value, password: hashPassword(value.password) }),
  );

  if (isValid) {
    accountRepository.save(account);
  }

  return {
    error: !isValid ? errors : null,
    account,
  };
};
