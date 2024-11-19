/** TODO: we shouldn't import the connection like this, we need to use DIP here */
import db from "../infra/database/connection.js";

const save = async (account) => {
  await db.run("INSERT INTO accounts (login, password) VALUES (?, ?)", [
    account.login,
    account.password,
  ]);
};

const existsByLogin = async (login) => {
  const result = await db.get("SELECT * FROM accounts WHERE login = ?", [
    login,
  ]);
  return result !== undefined;
};

export const accountRepository = {
  save,
  existsByLogin,
};
