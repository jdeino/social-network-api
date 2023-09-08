const { User } = require('../models');

const userController = {
  getAllUsers(req, res) {
    User.find({})
      .populate('thoughts')
      .populate('friends')
      .then((users) => res.json(users))
      .catch((err) => res.status(400).json(err));
  },

  getUserById({ params }, res) {
    User.findById(params.userId)
      .populate('thoughts')
      .populate('friends')
      .then((user) => res.json(user))
      .catch((err) => res.status(400).json(err));
  },

  createUser({ body }, res) {
    User.create(body)
      .then((user) => res.json(user))
      .catch((err) => res.status(400).json(err));
  },

  updateUser({ params, body }, res) {
    User.findByIdAndUpdate(params.userId, body, { new: true, runValidators: true })
      .then((user) => res.json(user))
      .catch((err) => res.status(400).json(err));
  },

  deleteUser({ params }, res) {
    User.findByIdAndDelete(params.userId)
      .then((user) => res.json(user))
      .catch((err) => res.status(400).json(err));
  },

  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.friendId } },
      { new: true }
    )
      .then((user) => res.json(user))
      .catch((err) => res.status(400).json(err));
  },

  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((user) => res.json(user))
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = userController;
