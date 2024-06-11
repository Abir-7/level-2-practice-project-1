import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TLoginUser } from './auth.interface';
import { User } from '../users/user.model';
import jwt from 'jsonwebtoken';
import config from '../../config';
const loginUser = async (payload: TLoginUser) => {
  console.log(payload);
  // chesk if user exist
  const isUserExist = await User.isUserExistsByCustomId(payload?.id);
  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User not Found', '');
  }
  console.log(isUserExist);
  // check if user deleted
  if (isUserExist.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User account deleted', '');
  }
  /// ceck if user block or not
  if (isUserExist.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'User account is blocked', '');
  }

  // // check password
  if (!(await User.isPasswordMatch(payload.password, isUserExist.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password is wrong', '');
  }

  //createing access token
  const userData = {
    userId: isUserExist.id,
    role: isUserExist.role,
  };
  const accessToken = jwt.sign(
    {
      data: userData,
    },
    config.jwt_secrete_key as string,
    { expiresIn: '1h' },
  );

  return {
    needPasswordChange: isUserExist.needPasswordChange,
    accessToken,
  };
};

export const AuthServices = {
  loginUser,
};
