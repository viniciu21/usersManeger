require('../bootstrap');

module.exports = {
  dialect: process.env.DB_DIALETC || 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: 'usersManege',
  storage: './__tests__/database.sqlite',
  logging: false, //To appear the queries of postgress
  define: {
    timestamps: true,
  },
};
