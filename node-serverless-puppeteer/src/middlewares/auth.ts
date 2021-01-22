import { Request, verifyToken } from '../services';
import User from '../models/User';

const BEARER_TOKEN_PATTERN = /^Bearer[ ]+([^ ]+)[ ]*$/i;

const extractAccessToken = (authorization: string | null | undefined) => {
    if (!authorization) return null;

    const result = BEARER_TOKEN_PATTERN.exec(authorization);
    if (!result) return null;

    return result[1];
};

export const Authorizer = async (req: Request) => {
    const authorizationHeader: any = req.headers['Authorization'];
    const accessToken: string | null = extractAccessToken(authorizationHeader);

    if (!accessToken) throw { status: 401, message: 'Invalid Bearer Token' };

    const verified: any = verifyToken(accessToken);
    const user = await User.findOne(verified?.id);

    if (user) {
        return user;
    } else {
        throw { status: 401, message: 'NotFound User' };
    }
};

export const ifAuthorizer = async (req: Request) => {
    const authorizationHeader: any = req.headers['Authorization'];
    const accessToken: string | null = extractAccessToken(authorizationHeader);

    if (!accessToken) return null;

    const verified = verifyToken(accessToken);
    const user = await User.findOne(verified?.id);

    if (user) {
        return user;
    } else {
        return null;
    }
};

export const AdminAuthorizer = async (req: Request) => {
    const user = await Authorizer(req);
    const isAdmin = user?.role === 'admin';

    if (isAdmin) {
        return user;
    } else {
        throw { status: 401, message: 'Authorization Failure: No Permission' };
    }
};

export const SelfAuthorizer = async (req: Request, compareUser: User) => {
    const user: User = await Authorizer(req);

    if (user?.role === 'admin' || user?.id === compareUser?.id) {
        return user;
    }

    throw {
        status: 401,
        message: 'Authroization Failure: No Permission Admin',
    };
};
