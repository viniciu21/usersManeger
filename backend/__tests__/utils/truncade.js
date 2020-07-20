const connection = require('../../src/database/index');

const truncate = async () => {
  return Promise.all(
    Object.keys(connection.models).map((keys) => {
      return connection.models[keys].destroy({
        truncate: true,
        force: true,
      });
    })
  );
};

module.exports = truncate;
