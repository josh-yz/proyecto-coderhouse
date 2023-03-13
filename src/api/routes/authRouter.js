const express = require('express');
const router = express.Router();

const {
    getLogout,
    postLogin
} = require('../controllers/authController');


router.post('/login',postLogin); 
router.get('/logout',getLogout); 


module.exports = router;