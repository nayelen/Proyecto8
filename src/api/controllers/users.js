const bcrypt = require('bcrypt');
const User = require('../models/users');
const { generateSign } = require('../../config/jwt');

const getUser = async (req, res, next) => {
  try {
    const users = await User.find()
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json(error);
  }
};
const register = async (req, res, next) => {
  try {
    const newUser = new User(req.body)
    const duplicateUser = await User.findOne({ userName: req.body.userName });

    if (duplicateUser) {
      return res.status(400).json("Usuario en uso! Busca otro nombre")
    };
    const userSaved = await newUser.save();
    return res.status(200).json(userSaved);
  } catch (error) {
    return res.status(400).json(error);
  }
};
const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ userName: req.body.userName });
    if (!user) {
      return res.status(400).json("Usuario no existente")
    }
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = generateSign(user._id);
      return res.status(200).json({ user, token })
    } else {
      return res.status(400).json("La contraseña no es correcta")
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};
module.exports = { getUser, register, login }