const express = require('express');
const router = express.Router();
const moment = require('moment')
const shortid = require('shortid')
const db = require('../db.js')

/**
 * @api {post} /login login
 * @apiGroup auth
 * @apiName login
 * @apiParam {Sting} userId userId
 * @apiParam {Sting} fingerprint fingerprint
 * @apiExample {curl} curl ex
 * curl -X POST \
 * -d { userId: string, fingerprint: string} \
 * xx.com/login
 */
router.post('/', async (req, res, next) => {
  const ip = req.ip.match(/\d+\.\d+\.\d+\.\d+/)
  const payload = {
    ip: ip ? ip[0] : '0.0.0.0',
    id: shortid.generate(),
    userId: req.body.userId,
    fingerprint: req.body.fingerprint,
    createdAt: moment().valueOf(),
  }
  db.read()
  db.get('auth')
      .push(payload)
      .write()
  const token = Buffer.from(JSON.stringify({
    authId: payload.id,
    userId: payload.userId,
    fingerprint: `${payload.fingerprint[10]}${payload.fingerprint[15]}${payload.fingerprint[12]}`
  })).toString('base64')
  res.json({
    authId: payload.id,
    token,
  })
});

module.exports = router;
