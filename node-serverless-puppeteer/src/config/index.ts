type getEnvValueType = {
    (key: string): string;
    (key: string, type: 'number'): number;
    (key: string, type: 'string'): string;
    (key: string, type: 'boolean'): boolean;
};

const getEnvValue: getEnvValueType = (
    key: string,
    type: 'number' | 'string' | 'boolean' = 'string'
): any => {
    const value = process.env[key];

    if (!value) throw { status: 500, message: 'env error' };

    if (type === 'boolean') {
        return value.toLowerCase() === 'true';
    }

    if (type === 'number') {
        const parsedInt = parseInt(value);
        if (parsedInt) {
            return parsedInt;
        } else {
            throw { status: 500, message: 'env error' };
        }
    }

    if (type === 'string') return value;
    throw { status: 500, message: 'env type error' };
};

export const NODE_ENV: string = getEnvValue('NODE_ENV', 'string');
export const JWT_SECRET: string = getEnvValue('JWT_SECRET', 'string');
export const MYSQL = {
    host: getEnvValue('MYSQL_HOST', 'string'),
    user: getEnvValue('MYSQL_USER', 'string'),
    password: getEnvValue('MYSQL_PASSWORD', 'string'),
    database: getEnvValue('MYSQL_DATABASE', 'string'),
    logging: getEnvValue('MYSQL_LOGGING', 'boolean'),
    synchronize: getEnvValue('MYSQL_SYNC', 'boolean'),
};
