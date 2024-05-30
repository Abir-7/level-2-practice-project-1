import dovenv from 'dotenv';
import path from 'path';

dovenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  databaseUri: process.env.MONGODB_URI,
  bcrypt_sault_round: process.env.BCRYPT_SAULT_ROUND,
  default_password: process.env.DEFAULT_PASSWORD,
};
