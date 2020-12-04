const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('auth-token');

    if (!token) return res.status(401).send({status: 'Error', message: 'Access Denied.'});

    try {
        const verified = jwt.verify(token, process.env.TOKEN_URL);
        req.user = verified;
        next();
    } catch (err){
        res.status(400).send({status: 'Error', message: 'Invalid Token'});
    }
}

module.exports = {
    verifyToken
};