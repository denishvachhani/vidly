const {User, validate} = require('../models/user');
const config = require('config');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const _ = require("lodash");
const express = require('express');
const router = express.Router();

router.get('/me', auth, async(req, res) => {
  console.log("hererere")
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
})

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const { name, email, password } = req.body;

  let user = await User.findOne({ email });
  if(user) return res.status(400).send('user already registered');

  user = new User({ name,  email, password});
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  await user.save();

  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send(_.pick(user, ['_id' ,'name', 'email']))
  });

module.exports = router;