require('../bootstrap');

module.exports = {
  dialect: process.env.DB_DIALETC || 'postgres', //your type of database
  host: process.env.DB_HOST, //your host
  username: process.env.DB_USERNAME, //standart name for database postgree
  password: process.env.DB_PASSWORD, //insert your databese password,
  database: 'usersManege',
  storage: './__tests__/database.sqlite',
  logging: false,
  define: {
    timestamps: true,
  },
};
