module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'fish',
  password: 'fish',
  database: 'dash',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
