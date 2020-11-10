var express = require('express');
var router = express.Router();

router.get('/list', (req, res, next) => {
    res.json({
        errno: 0,
        data: [1, 2, 3]
    });
});

router.get('/detail', (req, res, next) => {
    res.json({
        errno: 0,
        data: 'ok'
    });
});

module.exports = router;