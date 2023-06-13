module.exports = {
  type: 'postgres',
  port: 5432,
  username: process.env.USERDB || 'fish',
  password: process.env.PASSWORD || 'fish',
  host: process.env.HOST_NAME || 'localhost',
  database: process.env.DATABASE_NAME || 'dash',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
