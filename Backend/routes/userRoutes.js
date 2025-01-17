const express=require('express');
const { registerUser, loginUser } = require('../controllers/useController');
const router=express.Router();

router('/signup', registerUser);
router('/login', LoginUser);

module.exports= router;