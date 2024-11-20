import joi from "joi";
import { validate } from "../../lib/validator.js";
import { hashPassword } from "../../lib/password.js";

const accountSchema = joi.object({
  login: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

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
