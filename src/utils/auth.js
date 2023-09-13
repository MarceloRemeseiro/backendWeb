function ensureAuthenticated(req, res, next) {
  if (process.env.NODE_ENV === "production" && !req.oidc.isAuthenticated()) {
    return res.redirect("/login");
  }
  next();
}

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER,
};

module.exports = { config, ensureAuthenticated };
