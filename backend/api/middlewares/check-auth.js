const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // verify method both decode and verify the value
    // it has 2 more arguments, an options one and a callback
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed '
        });
    }
};