import * as bcrypt from 'bcryptjs';

const SALT_ROUNDS: number = 14;

type Password = {
    hash: string;
    salt: string;
};

export const createPassword = async (password: string): Promise<Password> => {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(password, salt);

    return { hash, salt };
};

export const comparePassword = async (password: string, hash: string) => {
    const compared = await bcrypt.compare(password, hash);
    return compared;
};
