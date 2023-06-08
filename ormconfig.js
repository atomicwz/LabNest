module.exports = {
  type: 'postgres',
  port: 5432,
  host: process.env.HOST || 'dpg-ci0ti4g2qv21rs7kqh3g-a',
  username: process.env.USERDB || 'fish',
  password: process.env.PASSWORD || 'taRzczT9RSZW4DxUfZurRlLjsxW3intY',
  database: process.env.DATABASE || 'dash_z5xn',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
