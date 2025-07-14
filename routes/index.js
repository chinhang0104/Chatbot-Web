const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if (req.session.user) {
        res.redirect('/chat');
    } else {
        res.redirect('/auth/login');
    }
});

module.exports = router;
