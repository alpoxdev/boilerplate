import jsonwebtoken from "jsonwebtoken";

export const signToken = <T extends object>(
  key: string,
  value: T,
  expiresIn?: string
): string | undefined => {
  try {
    if (!expiresIn) expiresIn = "1d";
    return jsonwebtoken.sign(value, key, { expiresIn });
  } catch (error) {
    return undefined;
  }
};

export const verifyToken = <T extends object>(key: string, token: string) => {
  try {
    return jsonwebtoken.verify(token, key) as T;
  } catch (error) {
    return undefined;
  }
};
