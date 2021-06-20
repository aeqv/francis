//Modules
const express = require('express');
const router = express.Router();

//Routes
router.get('/', (req, res) => {
    res.render('home');
});

//Export 
module.exports = router;
