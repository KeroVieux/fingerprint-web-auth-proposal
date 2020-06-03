const express = require('express');
const router = express.Router();
const db = require('../db.js')

/**
 * @api {post} /logout logout
 * @apiGroup auth
 * @apiName logout
 * @apiParam {Sting} authId authId
 * @apiExample {curl} curl ex
 * curl -X POST \
 * -d { authId: string } \
 * xx.com/logout
 */
router.post('/', async (req, res, next) => {
  db.read()
  db.get('auth')
      .remove({ id: req.body.authId })
      .write()
  return res.send(true)

});

module.exports = router;
