import { Request, verifyToken, TokenPayload } from '../services';
import { User, UserRole } from '../models';

const BEARER_TOKEN_PATTERN = /^Bearer[ ]+([^ ]+)[ ]*$/i;

const extractAccessToken = (
    authorization: string | undefined
): string | null => {
    if (!authorization) return null;

    const result = BEARER_TOKEN_PATTERN.exec(authorization);
    if (!result) return null;

    return result[1];
};

export const Authorizer = async (req: Request): Promise<User> => {
    const authorizationHeader: string | undefined =
        req.headers['Authorization'];
    const accessToken: string | null = extractAccessToken(authorizationHeader);

    if (!accessToken) throw { status: 401, message: 'Invalid Bearer Token' };

    const verified: TokenPayload = verifyToken(accessToken);
    const user = await User.findOne({
        where: { id: verified.id },
    });

    if (user) {
        return user;
    } else {
        throw { status: 401, message: 'NotFound User' };
    }
};

export const SelfAuthorizer = async (
    req: Request,
    compareUser: User
): Promise<User> => {
    const user: User = await Authorizer(req);

    if (user.role === UserRole.admin || user.id === compareUser.id) {
        return user;
    }

    throw {
        status: 401,
        message: 'Authorization Failure: No Permission Picker',
    };
};

export const ifAuthorizer = async (req: Request): Promise<User | null> => {
    const authorizationHeader: string | undefined =
        req.headers['Authorization'];
    const accessToken: string | null = extractAccessToken(authorizationHeader);

    if (!accessToken) throw { status: 401, message: 'Invalid Bearer Token' };

    const verified: TokenPayload = verifyToken(accessToken);
    const user = await User.findOne({
        where: { id: verified.id },
    });

    if (user) {
        return user;
    } else {
        return null;
    }
};
