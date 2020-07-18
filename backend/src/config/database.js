module.exports = {
  dialect: 'postgres', //your type of database
  host: 'localhost', //your host
  username: 'postgres', //standart name for database postgree
  password: 'abc987abc', //insert your databese password,
  database: 'usersManege', // this one will be the name of your database
  define: {
    timestamps: true,
    /*
     * this will create for the tables two columns that will be named by
     * createdAt and updatedAt that will contain the date that were created
     */
  },
};
