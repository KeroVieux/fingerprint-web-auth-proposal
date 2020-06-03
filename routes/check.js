const express = require('express');
const router = express.Router();
const db = require('../db.js')

/**
 * @api {post} /check check
 * @apiGroup auth
 * @apiName check
 * @apiParam {Sting} authId authId
 * @apiParam {Sting} fingerprint fingerprint
 * @apiExample {curl} curl ex
 * curl -X POST \
 * -d { authId: string, fingerprint: string} \
 * xx.com/check
 */
router.post('/', async (req, res, next) => {
  const headers = req.headers
  const tokenDecode = Buffer.from(JSON.stringify(headers['doge-auth']), 'base64').toString()
  const tokenObj = JSON.parse(tokenDecode)
  console.log('tokenObj', tokenObj)
  const ip = req.ip.match(/\d+\.\d+\.\d+\.\d+/)
  const payload = {
    ip: ip ? ip[0] : '0.0.0.0',
    id: tokenObj.authId,
    fingerprint: req.body.fingerprint,
  }
  const dbRes = db.get('auth')
      .find(payload)
      .value()
  const fingerprintMatch = `${payload.fingerprint[10]}${payload.fingerprint[15]}${payload.fingerprint[20]}` === dbRes.fingerprint
  if (dbRes && fingerprintMatch) {
    return res.json({
      userId: dbRes.userId,
    })
  }
  return res.send(false)

});

module.exports = router;
