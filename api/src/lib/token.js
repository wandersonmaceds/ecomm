import jwt from 'jsonwebtoken';

export const createToken = (payload) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET);
}