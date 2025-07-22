import * as Joi from 'joi';

export const validationSchema = Joi.object({
  DATABASE_HOST: Joi.string().hostname().default('localhost'),
  DATABASE_PORT: Joi.number().default(3306),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
});
