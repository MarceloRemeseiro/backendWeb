// Middleware que siempre permite el acceso
const ensureAuthenticated = (req, res, next) => {
    next();
};

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER,
};

module.exports = { config, ensureAuthenticated };
