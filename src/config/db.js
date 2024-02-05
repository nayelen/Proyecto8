const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('Connectado a la base de datos 🎉');
  } catch (error) {
    console.log("Error en la conexión 💥")

  }
};

module.exports = { connectDB };