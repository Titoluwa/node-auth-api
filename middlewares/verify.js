// middlewares/verify.js
module.exports = function (req, res, next) {
    if (!req.user.isVerified) {
        return res.status(403).json({message: "Unverified!"});
    }
    next();
}