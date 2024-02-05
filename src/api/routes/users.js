const { isAdmin } = require("../../middlewares/auth");
const { register, login, getUser } = require("../controllers/users");

const userRouter = require("express").Router();

userRouter.get("/", [isAdmin], getUser);
userRouter.post("/register", register);
userRouter.post("/login", login)

module.exports = userRouter;