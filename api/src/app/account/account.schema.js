import joi from "joi";

export const accountSchema = joi.object({
  login: joi.string().email().required(),
  password: joi.string().min(6).required(),
});