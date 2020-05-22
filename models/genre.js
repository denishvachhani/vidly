const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLegth: 5,
        maxlength: 50
    }
})

const Genre = mongoose.model('Genre', genreSchema);


function validateByLegth(record, minLegth) {
    const schema = Joi.object().keys({
        name: Joi.string()
            .min(minLegth)
            .required(),
    });
    return Joi.validate(record, schema);
}

module.exports.Genre = Genre;
module.exports.validate = validateByLegth;