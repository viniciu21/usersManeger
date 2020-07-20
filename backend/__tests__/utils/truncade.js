const connection = require('../../src/database/index');

module.exports = {
  async truncate() {
    return Promise.all(
      Object.keys(connection.models).map((keys) => {
        return connection.models[keys].destroy({
          truncate: true,
          force: true,
        });
      })
    );
  },
};
