const express = require('express');
const router = express.Router();
const db = require('../db.js')

router.post('/', async (req, res, next) => {
  const ip = req.ip.match(/\d+\.\d+\.\d+\.\d+/)
  const playload = {
    ip: ip ? ip[0] : '0.0.0.0',
    id: req.body.authId,
    fingerprint: req.body.fingerprint,
  }
  const dbRes = db.get('auth')
      .find(playload)
      .value()
  if (dbRes) {
    return res.json({
      userId: dbRes.userId,
    })
  }
  return res.send(false)

});

module.exports = router;
