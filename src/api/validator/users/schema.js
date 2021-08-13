const Joi = require('joi');

const UserPayloadSchema = Joi.object({
  usernama: Joi.string().required(),
  password: Joi.string().required(),
  fullname: Joi.string().required(),
});

module.exports = { UserPayloadSchema };
