const { isAdmin, isAuth } = require("../../middlewares/auth");
const upload = require("../../middlewares/files");
const { getJuegos, getJuegoById, getJuegosByCategory, postJuegos, putJuegos, deleteJuegos, getJuegosByPrice, getJuegosAdmin } = require("../controllers/juegos");

const juegosRouter = require("express").Router();

juegosRouter.get('/not-verified', [isAdmin], getJuegosAdmin)
juegosRouter.get('/', getJuegos);
juegosRouter.get('/:id', getJuegoById);
juegosRouter.get('/category/:category', getJuegosByCategory);
juegosRouter.get('/price/:price', getJuegosByPrice);
juegosRouter.post('/', [isAuth], upload.single("image"), postJuegos);
juegosRouter.put('/:id', [isAdmin], upload.single("image"), putJuegos);
juegosRouter.delete('/:id', [isAdmin], deleteJuegos);

module.exports = juegosRouter;