const InvariantError = require('../../exceptions/InvariantError');
const { NotePayloadSchema } = require('./schema');

const NotesValidator = {
    validateNotePayload: (payload) => {
        const validateNotePayload = NotePayloadSchema.validate(payload);
        if (validateNotePayload.error) {
            throw new InvariantError(validateNotePayload.error.message);
        }
    },
}

module.exports = NotesValidator;