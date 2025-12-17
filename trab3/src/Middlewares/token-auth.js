import jwt from 'jsonwebtoken';

export function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];


    if (!token) {
        return res.status(401).json({ message: "Access Denied: No Token Provided!" });
    }

    jwt.verify(token, 'SEGREDO-DO-ENV', (err, decodedUser) => {
        if (err) {
            return res.status(403).json({ message: "Invalid Token" });
        }

        req.user = decodedUser;
        
        next();
    });
}