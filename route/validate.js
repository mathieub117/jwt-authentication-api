const express = require('express');
const router = express.Router();

router.get(
  '/validate',
  (req, res, next) => {
    res.json({
      success: true,
      user: req.user,
      token: req.query.secret_token
    })
  }
);

module.exports = router;
