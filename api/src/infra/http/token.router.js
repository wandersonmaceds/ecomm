import { Router } from 'express';
import {validate} from "../../lib/validator.js";
import {accountSchema} from "../../app/account/account.schema.js";
import {HTTP_STATUSES} from "../../lib/http.js";
import {verifyPassword} from "../../lib/password.js";
import {createToken} from "../../lib/token.js";



export const getTokenRouter = (accountRepository) => {
  const router = Router();
  
  router.post('/token', async (request, response) => {
    const { isValid,errors, value: accountRequest } = await validate(accountSchema, request.body, [
      {
        validate: async (value) => {
          const accountExists = await accountRepository.existsByLogin(value.login);
          return !accountExists;
        },
        name: 'account',
        message: 'account does not exist',
      }, 
      {
        validate: async (value) => {
          const account = await accountRepository.findByLogin(value.login);
          if(!account) return false;
          return !verifyPassword(value.password, account.password);
        },
        name: 'account',
        message: 'password or login is incorrect',
      }
    ]);
    
    if(!isValid) {
      return response.status(HTTP_STATUSES.BAD_REQUEST).json(errors);
    }
    
    const account = await accountRepository.findByLogin(accountRequest.login);
    const token = createToken(account.id);
    
    return response.status(HTTP_STATUSES.CREATED).json({ token });
  })
  
  return router;
}