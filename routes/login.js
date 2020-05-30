const express = require('express');
const router = express.Router();
const moment = require('moment')
const shortid = require('shortid')
const db = require('../db.js')


router.post('/', async (req, res, next) => {
  const ip = req.ip.match(/\d+\.\d+\.\d+\.\d+/)
  const playload = {
    ip: ip ? ip[0] : '0.0.0.0',
    id: shortid.generate(),
    userId: req.body.userId,
    fingerprint: req.body.fingerprint,
    createdAt: moment().valueOf(),
  }
  db.read()
  db.get('auth')
      .push(playload)
      .write()
  res.json({
    authId: playload.id,
  })
});

module.exports = router;
