import 'dotenv/config';

export const config = {
  port: process.env.PORT || 3000,
  mongo: process.env.MONGO_URI || 'mongodb://localhost:27017/express-mongo',
  jwt_secret: process.env.JWT_SECRET || 'secret',
  database: process.env.DATABASE_NAME || 'playlist-app',
};
