import joi from "joi";
import { randomUUID } from "crypto";

const accountSchema = joi.object({
  login: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

export const createAccount = async (data, accountRepository) => {
  const errorMap = {};
  const { error, value: account } = accountSchema.validate(data, {
    abortEarly: false,
  });
  
  if (error) {
    error.details.forEach((err) => {
      errorMap[err.path] = err.message;
    });
  }

  const loginAlreadyTaken = await accountRepository.existsByLogin(account.login);
  if(loginAlreadyTaken) {
    errorMap.login = '"login" already used';
  }

  const hasErrors = Object.keys(errorMap).length > 0;

  if(!hasErrors) {
    accountRepository.save(account)
  }

  return {
    error: hasErrors ? errorMap : null,
    account: { ...account,  createdAt: new Date().toUTCString(), id: randomUUID() }
  }
}