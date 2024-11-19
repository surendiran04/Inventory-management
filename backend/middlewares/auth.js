import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header

    if (!token) return res.status(401).send('Not Authorized');

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).send('Token is not valid');
        req.user = user; // Store decoded user info in request object
        next();
    });
};

export default authenticateToken;
