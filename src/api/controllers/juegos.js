const { deleteFile } = require("../../utils/deleteFile");
const Juego = require("../models/juegos")

const getJuegos = async (req, res, next) => {
  try {
    const juegos = await Juego.find({ verified: true });
    return res.status(200).json(juegos);
  } catch (error) {
    return res.status(400).json("Error en la solicitud")
  }
};
const getJuegosAdmin = async (req, res, next) => {
  try {
    const juegos = await Juego.find({ verified: false });
    return res.status(200).json(juegos);
  } catch (error) {
    return res.status(400).json("Error en la solicitud")
  }
};

const getJuegoById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const juego = await Juego.findById(id);
    return res.status(200).json(juego);
  } catch (error) {
    return res.status(400).json("No se encuentra juego con este id")
  }
};
const getJuegosByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const juegos = await Juego.find({ category });
    return res.status(200).json(juegos);
  } catch (error) {
    return res.status(400).json("Error en la solicitud")
  }
};
const getJuegosByPrice = async (req, res, next) => {
  try {
    const { category } = req.params;
    const juegos = await Juego.find({ category });
    return res.status(200).json(juegos);
  } catch (error) {
    return res.status(400).json("Error en la solicitud")
  }
};
const postJuegos = async (req, res, next) => {
  try {
    const newJuego = new Juego(req.body);
    console.log(newJuego)

    if (req.file) {
      newJuego.image = req.file.path;
    }
    if (req.user.rol === "admin") {
      newJuego.verified = true;
    } else {
      newJuego.verified = false;
    }

    const juegoCreated = await newJuego.save();
    return res.status(201).json(juegoCreated)
  } catch (error) {
    return res.status(400).json("Error en la solicitud")
  }
};
const putJuegos = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newJuego = await Juego(req.body);
    newJuego._id = id;

    if (req.file) {
      newJuego.image = req.file.path;
      const oldJuego = await Juego.findById(id);
      deleteFile(oldJuego.image);
    }

    const juegoUpdated = await Juego.findByIdAndUpdate(id, newJuego, { new: true });
    return res.status(200).json(juegoUpdated)
  } catch (error) {
    return res.status(400).json("Error en la solicitud")
  }
};
const deleteJuegos = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedJuego = await Juego.findByIdAndDelete(id);
    deleteFile(deletedJuego.image);
    return res.status(200).json(deletedJuego)
  } catch (error) {
    return res.status(400).json("Error en la solicitud")
  }
};

module.exports = { getJuegos, postJuegos, getJuegoById, putJuegos, getJuegosByPrice, getJuegosByCategory, deleteJuegos, getJuegosAdmin };