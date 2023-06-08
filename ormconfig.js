import dotenv from 'dotenv';
dotenv.config();

module.exports = {
  type: 'postgres',
  host: process.env.HOST || 'localhost',
  port: 5432,
  username: process.env.USERDB || 'fish',
  password: process.env.PASSWORD || 'fish',
  database: process.env.DATABASE || 'dash',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
