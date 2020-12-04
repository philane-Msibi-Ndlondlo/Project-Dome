const router = require("express").Router();
const { ValidateRegisterData, ValidateLoginData } = require('../models/Validator');
const User = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res)=>{
    
    //validate user data
    const validate = ValidateRegisterData(req.body);
    // error if data is invalid
    if (validate.error) return res.status(400).send({status: 'Error', message: validate.error.details[0].message});

    //Check if user in a database already
    const chekedUser = await User.findOne({email: req.body.email});

    //User exists, send error
   if (chekedUser) return res.status(400).send({status: 'Error', message: 'User already exists!'});

    //encrypt user password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //Create user instance
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email.trim(),
        password: hashPassword
    });

    try {
        // save user to db
        const savedUser = await user.save();

        //send user some info
        res.send({status: 'Success', message: "User Registered Successfully!", data: {
            id: savedUser._id,
            firstname: savedUser.firstname,
            lastname: savedUser.lastname,
            email: savedUser.email
        }});
    } catch(err) {
        //send error if failed to save to db
        return res.status(400).send({status: 'Error', message: err.toString()});
    }
});

router.post('/login', async (req, res)=>{
    
    const validate = ValidateLoginData(req.body);
    if (validate.error) return res.status(400).send({status: 'Error', message: validate.error.details[0].message});

    const user = await User.findOne({email: req.body.email});

    if (!user) return res.status(400).send({status: 'Error', message: 'Oops! Invalid Details. Email'});

    //check password
    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) return res.status(400).send({status: 'Error', message: 'Opps! Invalid Details. Password'});

    //Generate a token for user
    const token = jwt.sign({
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email
    }, process.env.TOKEN_URL, {expiresIn: '1h'});

    res.header('auth-token', token).send({status: 'Success', message: 'Logged In Successfully!', data: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        token: token
    }}); 

});

module.exports = router;