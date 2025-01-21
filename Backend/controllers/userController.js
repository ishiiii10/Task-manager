const User=require('../models/User');
const jwt= require('jsonwebtoken'); // JWTs are used for securely identifying users after they log in
const bcrypt= require('bcryptjs'); //for comparing the password

const generateToken=(id) => jwt.sign({id}, process.env.JWT_SECRET,{ expireIn: '30d'}); //JWT tokens are used to authenticate the user in future requests.

//Rergister User Part
const registerUser= async (req, res) => {
    const { name, email, password } = req.body;

    try{
      const UserExists = await User.findOne({ email });
      if(userExists) return res.status(400).json({message: 'User already exists'});

      const user = await User.create({ name, email, password });
      res.status(201).json({id: user.id, name: user.name, email: user.email, token: generateToken(user.id) });
    }catch(error) {
      res.status(500).json({message: 'Server Error'});
    }
};

//Login User Part

const loginUser = async (req, res) => {
    const {email, password } = req.body;

    try{
        const user= await User.findOne({ email });
        if(!User|| !(await bcrypt.compare(password,user.password))){
            return res.status(400).json({ message: 'Invalid Password'});
        }
        res.json({id:user.id, name:user.name, email:user.email, token: generateToken(user.id)});
    } catch(error){
        res.status(500).json({message: 'Server Error'});
    }
};

module.exports = { registerUser, loginUser };



