const accounts = [];


const save = (account) => accounts.push(account);
const existsByLogin = (login) => accounts.some(account => account.login === login);

export const accountRepository = { 
  save, existsByLogin 
};