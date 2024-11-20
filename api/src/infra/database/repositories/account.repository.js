export const getAccountRepository = (connection) => ({
  save: async (account) => {
    const createAccountQuery =
      "INSERT INTO accounts (login, password) VALUES (?, ?)";
    await connection.run(createAccountQuery, [account.login, account.password]);
  },
  existsByLogin: async (login) => {
    const checkAccountQuery = "SELECT * FROM accounts WHERE login = ?";
    const result = await connection.get(checkAccountQuery, [login]);
    return result !== undefined;
  },
  findByLogin: async (login) => {
    const checkAccountQuery = "SELECT * FROM accounts WHERE login = ?";
    return connection.get(checkAccountQuery, [login]);
  },
  findByID: async (id) => {
    const checkAccountQuery = "SELECT * FROM accounts WHERE id = ?";
    return connection.get(checkAccountQuery, [id]);
  }
});
