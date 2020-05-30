const express = require('express');
const router = express.Router();
const db = require('../db.js')

router.post('/', async (req, res, next) => {
  db.read()
  db.get('auth')
      .remove({ id: req.body.authId })
      .write()
  return res.send(true)

});

module.exports = router;
