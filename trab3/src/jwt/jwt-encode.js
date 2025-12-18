import jwt from 'jsonwebtoken';

export function encode(data) {
    return jwt.sign(data, 'SEGREDO-DO-ENV')
    
}