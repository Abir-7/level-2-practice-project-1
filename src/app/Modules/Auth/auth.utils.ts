import jwt from 'jsonwebtoken';
export const createToken = (
  jwtPayload: { userId: string; role: string },
  secreteKey: string,
  exDate: string,
) => {
  return jwt.sign(jwtPayload, secreteKey, {
    expiresIn: exDate,
  });
};
