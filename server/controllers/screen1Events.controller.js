const { emitEvent } = require("../services/socket.service");

const handleChangeScreenEvent = async (req, res) => {
  await emitEvent("next-screen");
  res.send({ message: "Cambio de pantalla exitoso" });
};

module.exports = {
  handleChangeScreenEvent,
};
