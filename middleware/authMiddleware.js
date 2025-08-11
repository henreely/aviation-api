const jwt = require(`jsonwebtoken`);
const User = require('../models/user.model');

const protect = async (req, res, next) => {
    try{
    // check for token in authorisation header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({ message: 'Not authorized, token missing or malformed'});
    }

    const token = authHeader.split(' ')[1];

    // verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user  to the request body
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
        return res.status(401).json({ message: 'User no longer exists'});
    }

    req.user = user,
    next();
} catch (err) {
    res.status(401).json({ message: 'Not authorized, token failed'});
}
};

module.exports = protect;