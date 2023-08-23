
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER
};

/* const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: 'http://localhost:3000',
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER
}; */

module.exports=config;