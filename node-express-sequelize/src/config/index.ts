import dotenv from 'dotenv';

dotenv.config();

const env = process.env;
const parseENV = (type: string, value: string): null | any => {
  if (!(value in env)) return null;
  if (type === 'number') {
    return parseInt(env[value] as any, 10);
  }
  if (type === 'string') {
    return env[value];
  }
  if (type === 'boolean') {
    return env[value] === 'TRUE' ?? false;
  }

  return null;
};

export default {
  PORT: parseENV('number', 'PORT'),
};
