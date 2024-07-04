/* eslint-disable no-console */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TLoginUser } from './auth.interface';
import { User } from '../users/user.model';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import bcrypt from 'bcrypt';
import { createToken } from './auth.utils';
import { sendEmail } from '../../utils/sendEmail';

const loginUser = async (payload: TLoginUser) => {
  // chesk if user exist
  const isUserExist = await User.isUserExistsByCustomId(payload?.id);
  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User not Found', '');
  }

  // check if user deleted
  if (isUserExist.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User account deleted', '');
  }
  /// ceck if user block or not
  if (isUserExist.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'User account is blocked', '');
  }
  // check password
  if (!(await User.isPasswordMatch(payload.password, isUserExist.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password is wrong', '');
  }

  //createing access token
  const userData = {
    userId: isUserExist.id,
    role: isUserExist.role,
    email: isUserExist.email,
  };
  const accessToken = createToken(
    userData,
    config.jwt_secrete_key as string,
    config.jwt_secrete_date as string,
  );

  const refreshToken = createToken(
    userData,
    config.jwt_refresh_key as string,
    config.jwt_refresh_date as string,
  );
  return {
    needPasswordChange: isUserExist.needPasswordChange,
    accessToken,
    refreshToken,
  };
};

const changePassword = async (
  user: JwtPayload,
  password: { oldPassword: string; newPassword: string },
) => {
  const isUserExist = await User.isUserExistsByCustomId(user?.userId);

  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User not Found', '');
  }

  // check if user deleted
  if (isUserExist.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User account deleted', '');
  }
  /// ceck if user block or not
  if (isUserExist.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'User account is blocked', '');
  }

  if (
    !(await User.isPasswordMatch(password.oldPassword, isUserExist.password))
  ) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password is wrong', '');
  }

  const newHashedPassword = await bcrypt.hash(
    password.newPassword,
    Number(config.bcrypt_sault_round),
  );

  const result = await User.findOneAndUpdate(
    {
      id: user.userId,
      role: user.role,
    },
    {
      password: newHashedPassword,
      needPasswordChange: false,
      passwordChangedAt: new Date(),
    },
    {
      new: true,
    },
  );

  //console.log('ff', result);

  if (result) {
    result.password = '********';
  }
  return result;
};

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_key as string,
  ) as JwtPayload;

  const { userId, iat } = decoded;

  // checking if the user is exist
  const user = await User.isUserExistsByCustomId(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !', '');
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !', '');
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !', '');
  }

  if (
    user.passwordChangedAt &&
    (await User.isJWTIssuedBeforePasswordChanged(
      user.passwordChangedAt,
      iat as number,
    ))
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !', '');
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_secrete_key as string,
    config.jwt_secrete_date as string,
  );

  return {
    accessToken,
  };
};

const forgetPassword = async (userId: string) => {
  // checking if the user is exist
  const user = await User.isUserExistsByCustomId(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !', '');
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !', '');
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !', '');
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const resetToken = createToken(
    jwtPayload,
    config.jwt_secrete_key as string,
    '10m',
  );

  const resetUILink = `${'http://localhost:3000'}?id=${user.id}&token=${resetToken} `;

  // eslint-disable-next-line no-console
  console.log(user.email);
  sendEmail(resetUILink);
};

const resetPassword = async (
  payload: { id: string; password: string },
  token: string,
) => {
  // checking if the user is exist
  const user = await User.isUserExistsByCustomId(payload?.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !', '');
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !', '');
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !', '');
  }

  const decoded = jwt.verify(
    token,
    config.jwt_secrete_key as string,
  ) as JwtPayload;

  //localhost:3000?id=A-0001&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJBLTAwMDEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDI4NTA2MTcsImV4cCI6MTcwMjg1MTIxN30.-T90nRaz8-KouKki1DkCSMAbsHyb9yDi0djZU3D6QO4

  if (payload.id !== decoded.userId) {
    console.log(payload.id, decoded.userId);
    throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden!', '');
  }

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_sault_round),
  );

  await User.findOneAndUpdate(
    {
      id: decoded.userId,
      role: decoded.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );
};

export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};
