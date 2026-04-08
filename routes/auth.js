const express= require('express')

const router = express.Router();

const { registerUser } = require('../controllers/authController');

/**
 * @route POST /api/register
 * @desc Register a new user
 * @access PUBLIC
 */

router.post('/register', registerUser);

/**
 * @route POST /api/auth/login
 * @desc Auth a user and get a token
 * @access Public
 */

router.post('/login',(req,res)=>{
     res.status(200).json({ success: true, message: 'Login route is working!' });
})

module.exports = router;