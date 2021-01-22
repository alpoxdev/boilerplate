import { initialFetchType } from 'lib';

export const AUTH_TYPE = {
    ...initialFetchType('LOGIN', 'auth/LOGIN'),
    ...initialFetchType('REGISTER', 'auth/REGISTER'),
};
