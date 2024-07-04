import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import { T_UserRole } from '../Modules/users/user.interface';
import { User } from '../Modules/users/user.model';

const auth = (...UserRole: T_UserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are unautorized', '');
    }

    const decoded = jwt.verify(
      token,
      config.jwt_secrete_key as string,
    ) as JwtPayload;

    const { role, userId, iat } = decoded;

    const user = await User.isUserExistsByCustomId(userId);

    //check user exixt or not

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found', '');
    }

    // check if user deleted
    if (user.isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'User account deleted', '');
    }
    /// ceck if user block or not
    if (user.status === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN, 'User account is blocked', '');
    }

    if (
      user.passwordChangedAt &&
      (await User.isJWTIssuedBeforePasswordChanged(
        user.passwordChangedAt,
        iat as number,
      ))
    ) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are unautorized please Login',
        '',
      );
    }

    if (UserRole && !UserRole.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are unautorized', '');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
