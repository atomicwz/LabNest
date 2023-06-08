module.exports = {
  type: 'postgres',
  port: 5432,
  host: process.env.HOST || 'dash_z5xn',
  username: process.env.USERDB || 'fish',
  password: process.env.PASSWORD || 'taRzczT9RSZW4DxUfZurRlLjsxW3intY',
  database: process.env.DATABASE || 'dash_z5xn',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
