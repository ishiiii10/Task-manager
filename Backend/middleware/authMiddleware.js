const jwt = require('jsonwebtoken');
const User= require('../models/User');

const protect= async (req, res, next)=>{
    let token;
    if(req.headrer.authorization && req.header.authorization.startsWith('Bearer')){
        try{
            token= req.header.authorization.spilt('')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user=await User.findById(decoded.id).select('-password');
            next();
        } catch(err){
            res.status(402).json({message: 'Unauthorized'});
        }
    }else{
        res.status(401).json({message: 'No Token Provided'});
    }
};

module.exports = {protect}; 