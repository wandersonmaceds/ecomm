/** TODO: we shouldn't import the connection like this, we need to use DIP here */
import db from "../../infra/database/connection.js";


const save = async (account) => {
  const createAccountQuery = "INSERT INTO accounts (login, password) VALUES (?, ?)";
  await db.run(createAccountQuery, [
    account.login,
    account.password,
  ]);
};

const existsByLogin = async (login) => {
  const checkAccountQuery = "SELECT * FROM accounts WHERE login = ?"
  const result = await db.get(checkAccountQuery, [
    login,
  ]);
  return result !== undefined;
};

export const accountRepository = {
  save,
  existsByLogin,
};
