import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  sessionSecret: process.env.SESSION_SECRET || 'secret_par_defaut_pour_les_sessions',
  jwtSecret: process.env.JWT_SECRET || 'secret_par_defaut_pour_le_jwt',
  nodeEnv: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  databaseUrl: process.env.NODE_ENV === 'test ' ? process.env.DB_URI_TEST || "mongodb+srv://user:user@tp03test.ex0ql.mongodb.net/?retryWrites=true&w=majority&appName=TP03Test" 
  : process.env.DB_URI_DEV || "mongodb+srv://user:user@tp03.vdohd.mongodb.net/?retryWrites=true&w=majority&appName=TP03"
};

