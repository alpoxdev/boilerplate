import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

interface TokenPayload {
    id: string;
    email: string;
    name: string;
    profile: string;
}

const signToken = (userPayload: TokenPayload) => {
    const token = jwt.sign(userPayload, JWT_SECRET);
    return token;
};

const signMailToken = (userPayload: TokenPayload) => {
    const token = jwt.sign(userPayload, JWT_SECRET, { expiresIn: 600 });
    return token;
};

const verifyToken = (token: string) => {
    try {
        const payload = jwt.verify(token, JWT_SECRET) as TokenPayload;
        return payload;
    } catch (error) {
        throw { status: 401, message: 'Invalid Token' };
    }
};

export { TokenPayload, signToken, verifyToken, signMailToken };
