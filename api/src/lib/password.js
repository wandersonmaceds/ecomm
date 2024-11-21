import bcrypt from "bcrypt";

export const hashPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

export const verifyPassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};
