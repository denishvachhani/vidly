const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Genre, validate } = require('../models/genre')

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres)
})

router.get('/:genreId', async (req, res) => {
    const genre = await Genre.findById(req.params.id)

    if (!genre) {
        return res.status(404).send('The genre with given id not found')
    }

    res.send(genre)
})

router.post('/', async (req, res) => {
    const { error } = validate(req.body, 3);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let genre = new Genre({ name: req.body.name });
    genre = await genre. save();

    res.send(genre);
})

router.delete('/:genreId', async (req, res) => {

    const genre = await Genre.findByIdAndRemove(req.params.id)

    if (!genre) {
        return res.status(404).send('The genre with given id not found')
    }

    res.send(genre);
})

router.put('/:genreId', async (req, res) => {
    const { error } = validate(req.body, 3);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const genre = await Genre.findByIdAndUpdate(req.params.genreId, {
        name: req.body.name
    })

    if (!genre) {
        return res.status(404).send('The genre with given id not found')
    }

    res.send(genre);
})

module.exports = router;