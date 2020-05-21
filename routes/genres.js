const express = require('express');
const Joi = require('joi');
const debug = require('debug')('app:startup');
const router = express.Router();

const genres = [
    { id: 1, name: 'action' },
    { id: 2, name: 'romantic' },
    { id: 3, name: 'sorrow' }
]

router.get('/', (req, res) => {
    debug("herer");
    res.send(genres)
})

router.get('/:genreId', (req, res) => {
    const genre = genres.find(genre => genre.id === parseInt(req.params.genreId))

    if (!genre) {
        return res.status(404).send('The genre with given id not found')
    }

    res.send(genre)
})

router.post('/', (req, res) => {
    const { error } = validateByLegth(req.body, 3);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }
    genres.push(genre)

    res.send(genre);
})

router.delete('/:genreId', (req, res) => {
    const genre = genres.find(genre => genre.id === parseInt(req.params.genreId));
    if (!genre) {
        return res.status(404).send('The genre with given id not found')
    }

    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genre);
})

router.put('/:genreId', (req, res) => {
    const genre = genres.find(genre => genre.id === parseInt(req.params.genreId))

    if (!genre) {
        return res.status(404).send('The genre with given id not found')
    }

    const { error } = validateByLegth(req.body, 3);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    genre.name = req.body.name

    res.send(genre);
})

function validateByLegth(record, minLegth) {
    const schema = Joi.object().keys({
        name: Joi.string()
            .min(minLegth)
            .required(),
    });
    return Joi.validate(record, schema);
}

module.exports = router;