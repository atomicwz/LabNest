module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'jest',
  password: 'jest',
  database: 'postgres',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
