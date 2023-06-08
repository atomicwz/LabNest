module.exports = {
  type: 'postgres',
  host: 'postgres://fish:taRzczT9RSZW4DxUfZurRlLjsxW3intY@dpg-ci0ti4g2qv21rs7kqh3g-a.oregon-postgres.render.com/dash_z5xn',
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
