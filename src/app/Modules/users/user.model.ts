import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';
const userSchema = new Schema<TUser, UserModel>(
  {
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    needPasswordChange: { type: Boolean, default: true },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    role: { type: String, enum: ['admin', 'student', 'faculty'] },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_sault_round),
  );
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '******';
  console.log(this, 'post hook: we saved the data');
  next();
});

userSchema.statics.isPasswordMatch = async function (
  plainTextPass,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPass, hashedPassword);
};

userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await User.findOne({ id: id });
};

export const User = model<TUser, UserModel>('User', userSchema);
