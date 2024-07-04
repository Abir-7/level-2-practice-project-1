import dovenv from 'dotenv';
import path from 'path';

dovenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  databaseUri: process.env.MONGODB_URI,
  bcrypt_sault_round: process.env.BCRYPT_SAULT_ROUND,
  default_password: process.env.DEFAULT_PASSWORD,
  node_env: process.env.NODE_ENV,
  jwt_secrete_key: process.env.JWT_SECRETE_KEY,
  jwt_secrete_date: process.env.JWT_SECRETE_DATE,
  jwt_refresh_key: process.env.JWT_REFRESH_KEY,
  jwt_refresh_date: process.env.JWT_REFRESH_DATE,
};
