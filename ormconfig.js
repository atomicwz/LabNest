module.exports = {
  type: 'postgres',
  host: 'dpg-ci0ti4g2qv21rs7kqh3g-a',
  port: 5432,
  username: 'taRzczT9RSZW4DxUfZurRlLjsxW3intY',
  password: 'fish',
  database: 'dash_z5xn',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
