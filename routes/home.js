const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    res.render('app', { title: 'my vidly app', message: 'hllow' });
  })

  module.exports = router;