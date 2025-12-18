import jwt from 'jsonwebtoken';

export function decode(token) {
    return jwt.verify(token, 'SEGREDO-DO-ENV')
    
}