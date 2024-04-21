// middlewares/auth.js
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next){
    const token = req.header('auth-token');
    if(!token){
        res.status(401).json({ message: 'Access denied. No token found'});
    }
    try {    
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        req.user = decoded;
        next();

    } catch (error) {
        res.status(400).json({ message: 'Invalid Token'});
    }
}