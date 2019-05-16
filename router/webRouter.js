const express = require('express');
const router = express.Router();

router.get('/1', function (req, res) {
    res.status(200).send({ a: 123 })
});
router.get('/2', function (req, res) { res.send('hi2') });

module.exports = router;
