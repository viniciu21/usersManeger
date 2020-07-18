const User = require('../models/user');
const { update } = require('../models/user');

module.exports = {
  async searchAll(req, resp) {
    try {
      const user = await User.findAll();

      if (!user) throw new Error('Something went wrong');

      return resp.json(user);
    } catch (e) {
      return resp.status(400).json(e.message);
    }
  },

  async storeUser(req, resp) {
    try {
      const { name, email, password } = req.body;

      const userDuplication = await User.findOne({ where: { email } });

      if (userDuplication) throw new Error('User already exists');

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

  async searchIndex(req, resp) {
    try {
      const { id } = req.body;

      const user = await User.findByPk(id);

      if (!user) throw new Error('This user does not exist');

      return resp.json(user);
    } catch (e) {
      return resp.status(400).json(e.message);
    }
  },

  async updateUser(req, resp) {
    try {
      const { id } = req.body;

      const [updated] = await User.update(req.body, { where: { id: id } });

      if (updated) {
        const updatedUser = await User.findOne({ where: { id: id } });

        return resp.status(200).json(updatedUser);
      }

      throw new Error('This user not exist');
    } catch (e) {
      resp.status(400).json(e.message);
    }
  },

  async deleteUser(req, resp) {
    try {
      const { id } = req.body;

      const deleted = await User.destroy({ where: { id: id } });

      if (deleted) {
        const deletedUser = await User.findOne({ where: { id: id } });
        return resp.status(200).json(deletedUser);
      }

      throw new Error('Something went wrong, try again');
    } catch (e) {
      resp.status(400).json(e.message);
    }
  },
};
