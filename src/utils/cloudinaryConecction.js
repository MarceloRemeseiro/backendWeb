const cloudinary = require('cloudinary').v2;

// Añadir mensajes de depuración
console.log('Configurando Cloudinary con:');
console.log('CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME ? 'Definido' : 'No definido');
console.log('API_KEY:', process.env.CLOUDINARY_API_KEY ? 'Definido' : 'No definido');
console.log('API_SECRET:', process.env.CLOUDINARY_API_SECRET ? 'Definido' : 'No definido');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

module.exports = cloudinary;

