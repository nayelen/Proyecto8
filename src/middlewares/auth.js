const User = require("../api/models/users");
const { verifyJwt } = require("../config/jwt");

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const parsedToken = token.replace("Bearer ", "");

    const { id } = verifyJwt(parsedToken);
    const user = await User.findById(id);

    user.password = null;
    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json("No estas autorizado")
  }
};
const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const parsedToken = token.replace("Bearer ", "");

    const { id } = verifyJwt(parsedToken);
    const user = await User.findById(id);
    if (user.rol === "admin") {
      user.password = null;
      req.user = user;
      next();
    } else {
      return res.status(400).json("Esta acción solo la puede realizar los administradores");
    }

  } catch (error) {
    return res.status(400).json("No estas autorizado")
  }
};
module.exports = { isAuth, isAdmin }