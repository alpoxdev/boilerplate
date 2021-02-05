import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import { User } from '../models';

interface TokenPayload {
    id: string;
    email: string;
    nickname: string;
    profile?: string;
}

const signToken = (userPayload: TokenPayload): string => {
    const token = jwt.sign(userPayload, JWT_SECRET);
    return token;
};

const signMailToken = (userPayload: TokenPayload): string => {
    const token = jwt.sign(userPayload, JWT_SECRET, { expiresIn: 600 });
    return token;
};

const verifyToken = (token: string): TokenPayload => {
    try {
        const payload = jwt.verify(token, JWT_SECRET) as TokenPayload;
        return payload;
    } catch (error) {
        throw { status: 401, message: 'Invalid Token' };
    }
};

export { TokenPayload, signToken, verifyToken, signMailToken };
