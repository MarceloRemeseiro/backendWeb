// Middleware simplificado que siempre permite el acceso
const ensureAuthenticated = (req, res, next) => {
    // Añadimos una propiedad user mock para evitar errores en caso de que algo la necesite
    req.user = {
        isAuthenticated: true
    };
    next();
};

module.exports = { ensureAuthenticated };
