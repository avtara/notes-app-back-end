const {
  PostAuthenticationPayloadSchema,
  PutAuthenticationPayloadSchema,
  DeleteAuthenticationPayloadSchema,
} = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const AuthenticationsValidator = {
  validatePostAuthenticationPayload: (payload) => {
    const validationPayload = PostAuthenticationPayloadSchema.validate(payload);
    if (validationPayload.error) {
      throw new InvariantError(validationPayload.error.message);
    }
  },
  validatePutAuthenticationPayload: (payload) => {
    const validationPayload = PutAuthenticationPayloadSchema.validate(payload);
    if (validationPayload.error) {
      throw new InvariantError(validationPayload.error.message);
    }
  },
  validateDeleteAuthenticationPayload: (payload) => {
    const validationPayload = DeleteAuthenticationPayloadSchema.validate(payload);
    if (validationPayload.error) {
      throw new InvariantError(validationPayload.error.message);
    }
  },
};

module.exports = AuthenticationsValidator;
