import dovenv from 'dotenv';
import path from 'path';

dovenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  databaseUri: process.env.MONGODB_URI,
};
