const jwt = require("jsonwebtoken");

function protegerAdmin(req, res, next) {
  try {
    const autorizacion = req.headers.authorization;

    if (!autorizacion || !autorizacion.startsWith("Bearer ")) {
      return res.status(401).json({
        mensaje: "Debes iniciar sesión como administradora"
      });
    }

    const token = autorizacion.split(" ")[1];

    const verificado = jwt.verify(token, process.env.JWT_SECRET);

    if (verificado.rol !== "admin") {
      return res.status(403).json({
        mensaje: "No tienes permiso para realizar esta acción"
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      mensaje: "Sesión inválida o vencida. Inicia sesión nuevamente."
    });
  }
}

module.exports = protegerAdmin;