const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

//GENERATE JWTOKEN
const generateToken = (user, secret, expiresIn) =>{
    return jwt.sign(
        {email: user.email, userId: user._id},
        secret,
        {expiresIn}
    )
}

exports.signup  = async (req, res, next) => {
    const{
        firstName,
        lastName,
        email,
        password,
        passwordConfirm,
    } = req.body; // object destructuiring

    // checkinmg if user already exists in the database
    const existingUser = await User.findOne({ email});
    if (existingUser) {
        return next (new Error('Email already exist. Please check your email.', 400))
    }

    // create a new User
    const user = new User({
        firstName,
        lastName,
        email,
        password,
        passwordConfirm
    });

    const result = await user.save();
    res.status(201).json({
        message:"User created succesfully",
        result
    });
}

exports.login = async (req, res, next) =>{
const { email, password } = req.body;

//Checking if user exist on the sdb throuh the signing up
if (!email || !password) {
    return next(new Error("Please provide email and password", 400));
}

//calling user to login
const user = await User.findOne({ email }).select('+password');
if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new Error("Incorrect Email or password", 401));
}

//Generating token upon login successfull
const access_token = generateToken(user, process.env.JWT_SECRET, process.env.EXPIRES_IN);

// save the login user
await user.save({validateBeforeSave: false});

res.status(200).json({
    user,
    access_token
});


}