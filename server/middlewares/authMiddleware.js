const jwt = require('jsonwebtoken');
//import JWT_SECRET from '../config/config';
function authMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                error: "Authorization header missing"
            });
        }

        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                error: "Invalid token format. Expected 'Bearer <token>'"
            });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body = req.body || {};
        req.body.userId = decoded.userId;
        next();

    } catch (err) {
        return res.status(403).json({
            error: "Invalid or expired token"
        });
    }
}

module.exports = authMiddleware;
