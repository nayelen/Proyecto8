const { isAdmin } = require("../../middlewares/auth");
const upload = require("../../middlewares/files");
const { getPlataformas, getPlataformaById, postPlataforma, putPlataforma, deletePlataforma } = require("../controllers/plataformas");

const plataformasRouter = require("express").Router();

plataformasRouter.get("/", getPlataformas);
plataformasRouter.get("/:id", getPlataformaById);
plataformasRouter.post("/", [isAdmin], upload.single("image"), postPlataforma);
plataformasRouter.put("/:id", [isAdmin], upload.single("image"), putPlataforma);
plataformasRouter.delete("/:id", [isAdmin], deletePlataforma);

module.exports = plataformasRouter;
