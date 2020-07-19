const User = require('../models/user');

module.exports = {
  async searchAll(req, resp) {
    try {
      const user = await User.findAll();

      if (!user) throw new Error('Algo ocorreu errado');

      return resp.status(200).json(user);
    } catch (e) {
      return resp.status(400).json(e.message);
    }
  },

  async storeUser(req, resp) {
    try {
      const { name, email, password } = req.body;

      const userDuplication = await User.findOne({ where: { email } });

      if (userDuplication) throw new Error('Usuário já existe');

      if (name === '' || email === '' || password === '')
        throw new Error('Porfavor, preencha todos os campos');

      const user = await User.create({
        name,
        email,
        password,
      });

      return resp.json(user);
    } catch (e) {
      resp.status(400).json(e.message);
    }
  },

  async searchByIndex(req, resp) {
    try {
      const { id } = req.body;

      const user = await User.findByPk(id);

      if (!user) throw new Error('Este usuário não existe');

      return resp.json(user);
    } catch (e) {
      return resp.status(400).json(e.message);
    }
  },

  async updateUser(req, resp) {
    try {
      const { id, name, email, password } = req.body;

      if (name === '' || email === '' || password === '')
        throw new Error('Porfavor, preencha todos os campos');

      const [updated] = await User.update(req.body, { where: { id: id } });

      if (updated) {
        const updatedUser = await User.findOne({ where: { id: id } });

        return resp.status(200).json(updatedUser);
      }

      throw new Error('Este usuário não existe');
    } catch (e) {
      resp.status(400).json(e.message);
    }
  },

  async deleteUser(req, resp) {
    try {
      const { id } = req.body;

      const deletedUser = await User.findOne({ where: { id: id } });
      const deleted = await User.destroy({ where: { id: id } });

      if (deleted) {
        return resp.status(200).json(deletedUser);
      }

      throw new Error('Algo ocorreu errado, tente novamente');
    } catch (e) {
      resp.status(400).json(e.message);
    }
  },
};
